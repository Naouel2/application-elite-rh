const Sequelize = require('sequelize');
const db = require('../config/database');

// Réservation model
const Reservation = db.define('reservation', {
  numero_reservation: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  id_utilisateur: {
    type: Sequelize.INTEGER,
    references: {
      model: 'utilisateurs', // Name of the target model (table name)
      key: 'id'
    },
    allowNull: false,
    onDelete: 'cascade'
  },
  id_formation: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'formations', // Name of the target model (table name)
      key: 'id'
    },
    onDelete: 'CASCADE'
  }
});

module.exports = Reservation;
