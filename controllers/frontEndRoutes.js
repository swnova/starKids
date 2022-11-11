const express = require('express');
const router = express.Router();
const {User, Kid, Task, Star } = require('../models');

router.get("/",(req,res)=>{
    User.findAll().then(users=>{
        const userHbsData = users.map(user=>user.get({plain:true}))
        console.log(users);
        console.log(userHbsData);

        res.render("home",{
            users:userHbsData,
            logged_in:req.session.logged_in
        })
    })
})

router.get("/sessions",(req,res)=>{
    res.json(req.session)
})

// redirects to kid profile once logged in 
router.get("/login",(req,res)=>{
    if(req.session.logged_in){
        return res.redirect("/profile")
    }
    res.render("login")
})

router.get("/profile",(req,res)=>{
    if(!req.session.logged_in){
        return res.redirect("/login")
    }
    User.findByPk(req.session.user_id,{
        include:[Kid]
    }).then(userData=>{
        const hbsData = userData.toJSON();
        console.log(hbsData)
        hbsData.logged_in=req.session.logged_in
        res.render("kidProfile",hbsData)
    })
})

//redirects to group profile once logged in
router.get("/group-profile",(req,res)=>{
    if(!req.session.logged_in){
        return res.redirect("/login")
    }
    User.findByPk(req.session.user_id,{
        include:[Kid, Task, Star],
        order: [
          [Task,'id', 'ASC']
        ],
    }).then(userData=>{
        const hbsData = userData.toJSON();
        
        const starleft = hbsData.group_star_goal_num - hbsData.stars.length;
        hbsData.starsUntilGoal = ( starleft < 0 )? 0 : starleft ;

        const taskSet = [] ; 
        const colors = ['blue', 'green', 'pink', 'purple', 'yellow','orange', 'navy', 'red', 'aqua'];
        const colorCodes = ['#01b2e6', '#8cc63e', '#ef3589', '#863288', '#fed403','#fb8405', '#031e91', '#f90606', '#03fbdb'];
        const bgColorCodes = ['#a6e2f4', '#d7f5af', '#fcd5fd', '#ca96cb', '#fdf3c3','#fdc58a', '#6373b9', '#f8abab', '#cffcf6'];
    
        for (let i = 0; i < hbsData.task_categories.length ; i++) {
          const starsForThisTask = hbsData.stars.filter(star => star.task_category_id == hbsData.task_categories[i].id)      
          const taskSetObj  = { 
            id: hbsData.task_categories[i].id, 
            task: hbsData.task_categories[i].task, 
            starnum : starsForThisTask.length,
            color: colors[i],
            colorCodes: colorCodes[i],
            bgcolorCodes: bgColorCodes[i]
          } 
          taskSet.push(taskSetObj)
        }
    
        console.log(taskSet);

        hbsData.logged_in=req.session.logged_in;
        hbsData.taskSet = taskSet;

        console.log(hbsData)
        res.render("groupProfile",hbsData)
    })
})


// render data if logged in to all user profiles
router.get("/all-user",(req,res)=>{
    if(!req.session.logged_in){
        return res.redirect("/login")
    }
    User.findAll().then(users=>{
        const userHbsData = users.map(user=>user.get({plain:true}))
        console.log(users);
        console.log(userHbsData);
  
        res.render("allUser",{
            users:userHbsData,
            logged_in:req.session.logged_in
        })
    })
})


  // 


module.exports = router;