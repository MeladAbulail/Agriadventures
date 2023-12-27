const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  database: "Agriadventures",
  username: "itsRaiga",
  password: "231201",
  host: "localhost",
  dialect: "postgres",
})

module.exports = sequelize

// pg_restore -U Agri_Adventure_Ayoub -d Agri_Adventure -F c -c C:\Users\Orange\Desktop\Agriadventures\Agri_Adventure.sql