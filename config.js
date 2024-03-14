const Sequelize = require('sequelize');
require('dotenv').config()

const sequelize = new Sequelize(
 process.env.DB_DATABASE,
 process.env.DB_USER,
 process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3001
  }
);

module.exports = sequelize;