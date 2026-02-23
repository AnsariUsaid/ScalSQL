const { Sequelize } = require('sequelize');
require('dotenv').config();

// Standard Sequelize initialization for the Core DB (either Local Postgres/Dummy DB for prototype)
const sequelize = new Sequelize(
  process.env.DB_NAME || 'scalsql_core',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'password',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: false, // Set to true to see SQL statements
  }
);

// We will export a function to connect to dynamic institution databases later
const createInstitutionConnection = (dbConfig) => {
  return new Sequelize({
    dialect: dbConfig.dialect,
    host: dbConfig.host,
    port: dbConfig.port,
    database: dbConfig.database,
    username: dbConfig.username,
    password: dbConfig.password,
    logging: false
  });
};

module.exports = { sequelize, createInstitutionConnection };
