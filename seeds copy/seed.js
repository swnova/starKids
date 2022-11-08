const sequelize = require('../config/connection');
const { User, Kid } = require('../models');

const userData = require('./userData.json');
const kidData = require('./kidData.json');

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

  process.exit(0);
};

seedDatabase();
