const Sequelize = require('sequelize');
const db = require('../config/database');

// Salle model
const Salle = db.define('salle', {

    nom_salle: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    batiment_salle: {
        type: Sequelize.STRING,
        allowNull: false
    }
   
});

module.exports = Salle;
