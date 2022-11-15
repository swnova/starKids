const router = require('express').Router();
const { User } = require('../models');

//create a user
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//login user
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

//logout user end session
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// ---In progress ----//

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


router.put('/', async (req, res) => {
  console.log("****");
  console.log(req.session.user_id)
  try {
    const userData = await User.update(
      {
        group_name: req.body.group_name,
        group_star_goal_num: req.body.group_star_goal_num,
        group_goal_award: req.body.group_goal_award,
        group_picture: req.body.group_picture,
      },
      {
        where: {
          id:  req.session.user_id
        },
      }
    );
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
