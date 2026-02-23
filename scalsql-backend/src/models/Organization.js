const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Organization = sequelize.define('Organization', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  plan: {
    type: DataTypes.STRING,
    defaultValue: 'free', // 'free', 'pro', 'enterprise'
  }
}, {
  timestamps: true, // adds createdAt, updatedAt
});

module.exports = Organization;
