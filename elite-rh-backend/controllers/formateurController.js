const formateurService = require('../services/formateurService');

exports.getAllFormateurs = async (req, res) => {
    try {
        const formateurs = await formateurService.getAllFormateurs();
        res.status(200).json({
            formateurs
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
