const router = require('express').Router();
const {User, Kid, Task, Star } = require('../models');

//add a kid to profile
router.post('/', async (req, res) => {
  if(!req.session.logged_in){
    return res.status(401).json({msg:"please login"})
  }
  try {
    console.log(req.body);
    const newKid = await Kid.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newKid);
  } catch (err) {
    res.status(400).json(err);
  }
});

//remove a kid from profile
router.delete('/:id', async (req, res) => {
  if(!req.session.logged_in){
    return res.status(401).json({msg:"please login"})
  }
  try {
    const kidData = await Kid.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!kidData) {
      res.status(404).json({ message: 'No kids found with this id!' });
      return;
    }

    res.status(200).json(kidData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id",(req,res)=>{
  if(!req.session.logged_in){
      return res.redirect("/login")
  }
  Kid.findByPk(req.params.id,{
    include:[
      {model: User, include:[Task]},
      {model: Star, include:[Task]}
    ]
  }).then(userData=>{
    const hbsData = userData.toJSON();

    hbsData.logged_in=req.session.logged_in;
    hbsData.starsUntilGoal = hbsData.star_goal_num - hbsData.stars.length;
    console.log(hbsData.user.task_categories)

    //array of object with taskId, taskName & the number of stars of the task that this kid has
    const taskSet = [] ; 
    const colors = ['blue', 'green', 'pink', 'purple', 'yellow','orange', 'navy', 'red', 'aqua'];

    for (let i = 0; i < hbsData.user.task_categories.length ; i++) {
      const starsForThisTask = hbsData.stars.filter(star => star.task_category_id == hbsData.user.task_categories[i].id)      
      const taskSetObj  = { 
        id: hbsData.user.task_categories[i].id, 
        task: hbsData.user.task_categories[i].task, 
        starnum : starsForThisTask.length,
        color: colors[i]
      } 
      taskSet.push(taskSetObj)
    }
    hbsData.taskSet = taskSet;
    console.log(hbsData)
    res.render("kidDetail",hbsData)
  })
})

module.exports = router;