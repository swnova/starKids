const router = require('express').Router();
const { User, Star, Kid, Task} = require('../models');

//post a star to a kid
router.post('/', async (req, res) => {
    if(!req.session.logged_in){
      return res.status(401).json({msg:"please login"})
    }
    Star.findByPk(req.params.id,{
              include:[
                {model: User, include:[Task], include:[Kid]}
              ]
            })
    try {
      const newStar = await Star.create({
        ...req.body,
        user_id: req.session.user_id,
      });
      res.status(200).json(newStar);
    } catch (err) {
      res.status(400).json(err);
    }
  });
//   router.get("/:id",(req,res)=>{
//     if(!req.session.logged_in){
//         return res.redirect("/login")
//     }
//     Star.findByPk(req.params.id,{
//       include:[
//         {model: User, include:[Task], include:[Kid]}
//       ]
//     }).then(userData=>{
//         const hbsData = userData.toJSON();
        
//         hbsData.logged_in=req.session.logged_in
//         console.log(hbsData)
//         res.render("kidDetail",hbsData)
//     })
//   })


module.exports = router;