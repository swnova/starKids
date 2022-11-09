const router = require('express').Router();
const userRoutes = require('./userRoutes');
const kidRoutes = require('./kidsRoutes');
const taskRoutes= require('./taskRoutes');
const frontEndRoutes = require("./frontEndRoutes")

router.use('/users', userRoutes);
router.use('/kids', kidRoutes);
router.use('/tasks', taskRoutes);
router.use(frontEndRoutes);

module.exports = router;