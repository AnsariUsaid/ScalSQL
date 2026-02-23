const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Organization = require('./Organization');

const DBConnection = sequelize.define('DBConnection', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dialect: {
    type: DataTypes.STRING, // 'postgres', 'mysql', etc.
    allowNull: false
  },
  host: {
    type: DataTypes.STRING,
    allowNull: false
  },
  port: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  db_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Store encrypted credentials securely
  encrypted_credentials: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  schema_cache: {
    type: DataTypes.JSONB, // store extracted schema here
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

module.exports = DBConnection;
