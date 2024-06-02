const Salle = require('../config/index').Salle;

exports.getAllSalles = async () => {
    const salles = await Salle.findAll();
    return salles;
}