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
            logged_in:req.session.logged_in,
            // to display 'ON' for active menu tag on the main navigation
            home_class_on:"on"
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
    res.render("login", {
        login_class_on: "on"
    })
})

router.get("/profile",(req,res)=>{
    if(!req.session.logged_in){
        return res.redirect("/login")
    }
    User.findByPk(req.session.user_id,{
        include:[Kid]
    }).then(userData=>{
        const hbsData = userData.toJSON();
        // to display 'ON' for active menu tag on the main navigation
        hbsData.profile_class_on = "on";
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
        // to display 'ON' for active menu tag on the main navigation
        hbsData.group_profile_class_on = "on";

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
    
        const kidTotalStarSet=[];
        for (let i = 0; i < hbsData.kids.length ; i++) {
            const starsForThisKid = hbsData.stars.filter(star => star.kid_id == hbsData.kids[i].id);
            const kidStarObj  = { 
                id: hbsData.kids[i].id, 
                kidname : hbsData.kids[i].name,
                starnum : starsForThisKid.length,
                colorCodes: colorCodes[i],
                bgcolorCodes: bgColorCodes[i]
            }  
            kidTotalStarSet.push(kidStarObj)     
        }

        console.log(taskSet);

        hbsData.logged_in=req.session.logged_in;
        hbsData.taskSet = taskSet;
        hbsData.kidTotalStarSet = kidTotalStarSet;

        console.log(hbsData)
        res.render("groupProfile",hbsData)
    })
})



// 

router.get("/all-user",(req,res)=>{
    if(!req.session.logged_in){
        return res.redirect("/login")
    }
    User.findByPk(req.session.user_id).then(users=>{
        const userHbsData1 = users.toJSON();
        console.log(users);
        console.log(userHbsData1);
        User.findAll().then(members=>{
           
            const hbsmembers = members.map(flav=>flav.toJSON())
            userHbsData1.logged_in=req.session.logged_in;
            userHbsData1.members = hbsmembers
            userHbsData1.all_user_class_on= "on"
            console.log(userHbsData1)
            res.render("allUser",userHbsData1)
            })
        })
    })


module.exports = router;