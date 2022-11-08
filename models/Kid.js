const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Kid extends Model {}

Kid.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    star_goal_num: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    goal_award: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'kid',
  }
);

module.exports = Kid;
