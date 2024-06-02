const Sequelize = require('sequelize');
const db = require('../config/database');

// UtilisateurRoleUtilisateur (intermediary table)
const UtilisateurRoleUtilisateur = db.define('UtilisateurRoleUtilisateur', {}, { timestamps: false });

module.exports = UtilisateurRoleUtilisateur;
