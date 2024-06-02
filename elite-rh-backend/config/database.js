const Sequelize = require('sequelize');

require('dotenv').config()

const database = new Sequelize(process.env.DB_URL, {
  dialect: 'mysql',
  dialectModule: require('mysql2')
});

module.exports = database;

