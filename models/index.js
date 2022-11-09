const User = require('./User');
const Kid = require('./Kid');
const Task = require('./Task_categories');

User.hasMany(Kid, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Kid.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Task, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Task.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Kid, Task };
