const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Task_categories extends Model {}

Task_categories.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    task: {
        type: DataTypes.STRING,
        allowNull: false
      },
    group_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'group',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'task_categories',
  }
);

module.exports = Task_categories;
