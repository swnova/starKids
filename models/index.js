const User = require('./User');
const Kid = require('./Kid');

User.hasMany(Kid, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Kid.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Kid };
