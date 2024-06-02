const sequelize = require('./database');
const RoleUtilisateur = require('../models/RoleUtilisateur');
const Utilisateur = require('../models/Utilisateur');
const UtilisateurRoleUtilisateur = require('../models/UtilisateurRoleUtilisateur');
const Formateur = require('../models/Formateur');
const Reservation = require('../models/Reservation');
const Salle = require('../models/Salle');
const Formation = require('../models/Formation');

// Utilisateur-Roles relations
Utilisateur.belongsToMany(RoleUtilisateur, { through: UtilisateurRoleUtilisateur });
RoleUtilisateur.belongsToMany(Utilisateur, { through: UtilisateurRoleUtilisateur });

// Reservations relations
Reservation.belongsTo(Utilisateur, { foreignKey: 'id_utilisateur' });
Reservation.belongsTo(Formation, { foreignKey: 'id_formation'});
Utilisateur.hasMany(Reservation, { foreignKey: 'id_utilisateur' });
Formation.hasMany(Reservation, { foreignKey: 'id_formation'});

// Formation relations
Formation.belongsTo(Salle, { foreignKey: 'id_salle' });
Formation.belongsTo(Formateur, { foreignKey: 'id_formateur' });
Salle.hasMany(Formation, { foreignKey: 'id_salle' });
Formateur.hasMany(Formation, { foreignKey: 'id_formateur' });

module.exports = {
  sequelize,
  RoleUtilisateur,
  Utilisateur,
  Formateur,
  Reservation,
  Salle,
  Formation
};
