const Sequelize = require('sequelize');
const db = require('../config/database');

// Utilisateur model
const Utilisateur = db.define('utilisateur', {
    
    nom_utilisateur :{
        type: Sequelize.STRING,
        allowNull: false,
    } ,
    prenom_utilisateur : {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email_utilisateur: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    mdp_utilisateur: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    telephone_utilisateur: {
        type: Sequelize.STRING,
    }
});

module.exports = Utilisateur;
