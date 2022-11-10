const router = require('express').Router();
const {User, Kid, Task, Star } = require('../models');
const moment = require('moment-timezone');

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
    order: [[Star,'updatedAt', 'ASC']],
    include:[
      {model: User, include:[Task]},
      {model: Star, }
    ]

  }).then(userData=>{
    const hbsData = userData.toJSON();

    hbsData.logged_in=req.session.logged_in;
    hbsData.starsUntilGoal = hbsData.star_goal_num - hbsData.stars.length;
    console.log(hbsData.user.task_categories)

    //array of object with taskId,  taskName & the number of stars of the task that this kid has
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
    



    // array of object with date, and stars for each date
    const starDateSet = [];

    // get the first date from the star array
    let aDate = moment(hbsData.stars[0].createdAt).format('YYYY-MM-DD');
    
    let taskIdArray = [];
    


    for (let i = 0; i < hbsData.stars.length ; i++) {

      const thisStar = hbsData.stars[i];
      const thisDate = moment(hbsData.stars[0].createdAt).format('YYYY-MM-DD');

      if ( aDate === thisDate ){
        taskIdArray.push(thisStar.task_category_id)

      } else { 
        // date changed
        // create starDateObject for previous date. and insert to the starDateSet
        
        const starDateSetObj = {
          date : aDate,
          taskColors : taskIdArray.map(taskid => taskSet.find(item => item.id===taskid).color )
        }
        starDateSet.push(starDateSetObj);
        // now create a new array for new date
        taskIdArray = [];
        aDate = thisDate;
      }
      
    }
    // create starDateObject for the last date. and insert to the starDateSet
    const starDateSetObj = {
      date : aDate,
      taskColors : taskIdArray.map(taskid => taskSet.find(item => item.id===taskid).color)
    }
    starDateSet.push(starDateSetObj);
    console.log(starDateSet);

    hbsData.taskSet = taskSet;
    hbsData.starDateSet = starDateSet;

    console.log(hbsData)
    res.render("kidDetail",hbsData)
  })
})

module.exports = router;