const express = require('express');
const router = express.Router();
const formationController = require('../controllers/formationController');
const checkRole = require('../middleware/checkRole');

// All users routes
// Get all formations
router.get('/', checkRole([1, 2]), formationController.getAllFormations);

// Get a single formation by ID
router.get('/:id', checkRole([1, 2]), formationController.getFormationById);

// Admin only routes
// Create a new formation
router.post('/', checkRole([1]), formationController.createFormation);

// Update a formation by ID
router.put('/:id', checkRole([1]), formationController.updateFormation);

// Delete a formation by ID
router.delete('/:id', checkRole([1]), formationController.deleteFormation);

module.exports = router;
