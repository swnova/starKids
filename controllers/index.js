const router = require('express').Router();
const userRoutes = require('./userRoutes');
const kidRoutes = require('./kidRoutes');
const taskRoutes= require('./taskRoutes');

router.use('/users', userRoutes);
router.use('/kids', kidRoutes);
router.use('/tasks', taskRoutes);

module.exports = router;