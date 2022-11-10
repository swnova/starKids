const router = require('express').Router();
const userRoutes = require('./userRoutes');
const kidRoutes = require('./kidsRoutes');
const taskRoutes= require('./taskRoutes');
const frontEndRoutes = require("./frontEndRoutes");
const starRoutes= require('./starRoutes')

router.use('/users', userRoutes);
router.use('/kids', kidRoutes);
router.use('/tasks', taskRoutes);
router.use('/stars', starRoutes);
router.use(frontEndRoutes);

module.exports = router;