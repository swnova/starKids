const sequelize = require('../config/connection');
const { User, Kid } = require('../models');
const Task_categories = require('../models/Task_categories');
const userData = require('./userData.json');
const kidData = require('./kidData.json');
const taskCategoryData = require('./taskCategoryData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const kid of kidData) {
    await Kid.create({
      ...kid,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const task of taskCategoryData) {
    await Task_categories.create({
      ...task,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
