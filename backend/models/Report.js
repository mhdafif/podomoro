const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Task = require('./Task');

const Report = sequelize.define(
  'Report',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    completeMinutes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
      field: 'complete_minutes',
    },
    taskId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Task,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  },
  {
    tableName: 'reports',
    timestamps: true,
    indexes: [
      {
        fields: ['taskId'],
      },
      {
        fields: ['date'],
      },
      {
        fields: ['taskId', 'date'],
        unique: false,
      },
    ],
  },
);

// Associations
Report.belongsTo(Task, {
  foreignKey: 'taskId',
  as: 'task',
});

Task.hasMany(Report, {
  foreignKey: 'taskId',
  as: 'reports',
});

module.exports = Report;
