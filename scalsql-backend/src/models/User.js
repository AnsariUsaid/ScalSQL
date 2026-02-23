const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Organization = require('./Organization');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  role: {
    type: DataTypes.ENUM('Admin', 'Analyst', 'Viewer'),
    defaultValue: 'Viewer'
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  org_id: {
    type: DataTypes.UUID,
    references: {
      model: Organization,
      key: 'id'
    }
  }
}, {
  timestamps: true,
});

module.exports = User;
