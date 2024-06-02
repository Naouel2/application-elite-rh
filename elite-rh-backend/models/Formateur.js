const Sequelize = require('sequelize');
const db = require('../config/database');

// Formateur model
const Formateur = db.define('formateur', {

    nom_formateur: {
        type: Sequelize.STRING,
        allowNull: false,
    },
      prenom_formateur : {
        type: Sequelize.STRING,
        allowNull: false,
    },
    telephone_formateur: {
        type: Sequelize.STRING,
        },
    email_formateur: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    specialite_formateur: {
        type: Sequelize.STRING,
        allowNull: false,
        }

});

module.exports = Formateur;
