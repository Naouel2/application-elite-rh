const formationService = require('../services/formationService');

// Create a new formation
exports.createFormation = async (req, res) => {
    try {
        const newFormation = await formationService.createFormation(req.body);
        res.status(201).json({
            message: 'Formation created successfully!',
            formation: newFormation
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all formations
exports.getAllFormations = async (req, res) => {
    try {
        const formations = await formationService.getAllFormations();
        res.status(200).json(formations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single formation by ID
exports.getFormationById = async (req, res) => {
    try {
        const { id } = req.params;
        const formation = await formationService.getFormationById(id);
        if (!formation) {
            return res.status(404).json({ message: 'Formation not found' });
        }
        res.status(200).json(formation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a formation by ID
exports.updateFormation = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedFormation = await formationService.updateFormation(id, req.body);
        if (!updatedFormation) {
            return res.status(404).json({ message: 'Formation not found' });
        }
        res.status(200).json({
            message: 'Formation updated successfully!',
            formation: updatedFormation
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a formation by ID
exports.deleteFormation = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedFormation = await formationService.deleteFormation(id);
        if (!deletedFormation) {
            return res.status(404).json({ message: 'Formation not found' });
        }
        res.status(200).json({ message: 'Formation deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
