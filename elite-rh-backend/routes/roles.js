const express = require('express');
const router = express.Router();
const checkRole = require('../middleware/checkRole');
const roleController = require('../controllers/roleController');

// Get all roles
router.get('/', checkRole([1]), roleController.getAllRoles);

module.exports = router;

