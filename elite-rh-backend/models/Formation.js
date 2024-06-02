const Sequelize = require('sequelize');
const db = require('../config/database');

// Formation model
const Formation = db.define('formation', {

    nom_formation: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    domaine_formation: {
        type: Sequelize.STRING,
    },
    description_formation: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    date_debut_formation : {
        type: Sequelize.DATE,
        allowNull: false,
    },
    date_fin_formation : {
        type: Sequelize.DATE,
        allowNull: false,
    },
    id_salle : {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    id_formateur : {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    
});

module.exports = Formation;
