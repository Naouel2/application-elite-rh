const salleService = require('../services/salleService');

exports.getAllSalles = async (req, res) => {
    try {
        const salles = await salleService.getAllSalles();
        res.status(200).json({
            salles
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
