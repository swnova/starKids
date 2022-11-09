const router = require('express').Router();
const {User, Kid, Task } = require('../models');

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
    include:[
      {model: User, include:[Task]}
    ]
  }).then(userData=>{
      const hbsData = userData.toJSON();
      
      hbsData.logged_in=req.session.logged_in
      console.log(hbsData)
      res.render("kidDetail",hbsData)
  })
})

module.exports = router;