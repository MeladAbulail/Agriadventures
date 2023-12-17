const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  database: "Agriadventures",
  username: "itsRaiga",
  password: "231201",
  host: "localhost",
  dialect: "postgres",
})

module.exports = sequelize
