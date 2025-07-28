const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User');

const Task = sequelize.define(
  'Task',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 255],
      },
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active',
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  },
  {
    tableName: 'tasks',
    timestamps: true,
    indexes: [
      {
        fields: ['userId'],
      },
      {
        fields: ['status'],
      },
    ],
  },
);

// Associations
Task.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

User.hasMany(Task, {
  foreignKey: 'userId',
  as: 'tasks',
});

module.exports = Task;
