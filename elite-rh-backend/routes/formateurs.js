const express = require('express');
const router = express.Router();
const formateurController = require('../controllers/formateurController');
const checkRole = require('../middleware/checkRole');

// Get all formateurs
router.get('/', checkRole([1, 2]), formateurController.getAllFormateurs);

module.exports = router;
