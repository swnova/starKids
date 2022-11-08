const router = require('express').Router();
const { Kid } = require('../../models');

router.post('/', async (req, res) => {
  if(!req.session.logged_in){
    return res.status(401).json({msg:"please login"})
  }
  try {
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

module.exports = router;