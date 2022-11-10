const User = require('./User');
const Kid = require('./Kid');
const Task = require('./Task_categories');
const Star= require('./Star');

User.hasMany(Kid, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasMany(Task, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasMany(Star, {
  foreignKey:'user_id'
});

Kid.belongsTo(User, {
  foreignKey: 'user_id'
});

Kid.hasMany(Star, {
  foreignKey:'kid_id'
});

Task.belongsTo(User, {
  foreignKey: 'user_id'
});

Task.hasMany(Star, {
  foreignKey:'task_category_id'
});

Star.belongsTo(Task,{
  foreignKey:'task_category_id'
});

Star.belongsTo(Kid,{
  foreignKey:'kid_id'
});

Star.belongsTo(User, {
  foreignKey:'user_id'
});
module.exports = { User, Kid, Task };
