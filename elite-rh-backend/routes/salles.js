const express = require('express');
const router = express.Router();
const salleController = require('../controllers/salleController');
const checkRole = require('../middleware/checkRole');

// Get all salles
router.get('/', checkRole([1, 2]), salleController.getAllSalles);

module.exports = router;
