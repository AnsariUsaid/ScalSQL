const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User');

const QueryLog = sequelize.define('QueryLog', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  question: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  sql: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.STRING, // 'success', 'error', 'pending'
    defaultValue: 'pending'
  },
  execution_time: {
    type: DataTypes.INTEGER, // milliseconds
  },
  error_message: {
    type: DataTypes.TEXT
  },
  user_id: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: 'id'
    }
  }
}, {
  timestamps: true,
});

module.exports = QueryLog;
