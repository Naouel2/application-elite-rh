const Formateur = require('../config/index').Formateur;

exports.getAllFormateurs = async () => {
    const formateurs = await Formateur.findAll();
    return formateurs;
}