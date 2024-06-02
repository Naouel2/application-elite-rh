const { Formation } = require('../config/index');

// Create a new formation
async function createFormation(formationData) {
    try {
        const newFormation = await Formation.create(formationData);
        return newFormation;
    } catch (error) {
        throw error;
    }
}

// Get all formations
async function getAllFormations() {
    try {
        const formations = await Formation.findAll({
            include: {all: true}
        });
        return formations;
    } catch (error) {
        throw error;
    }
}

// Get a single formation by ID
async function getFormationById(id) {
    try {
        const formation = await Formation.findByPk(id, {
            include: {all: true}
        });
        return formation;
    } catch (error) {
        throw error;
    }
}

// Update a formation by ID
async function updateFormation(id, formationData) {
    try {
        const [updated] = await Formation.update(formationData, {
            where: { id: id }
        });
        if (!updated) {
            return null;
        }
        const updatedFormation = await getFormationById(id);
        return updatedFormation;
    } catch (error) {
        throw error;
    }
}

// Delete a formation by ID
async function deleteFormation(id) {
    try {
        const deleted = await Formation.destroy({
            where: { id: id }
        });
        // todo : remove reservations for this formation in the reservations table
        return deleted;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createFormation,
    getAllFormations,
    getFormationById,
    updateFormation,
    deleteFormation
};
