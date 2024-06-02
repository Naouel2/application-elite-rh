const express = require('express');
const userRoutes = express.Router();
const checkRole = require('../middleware/checkRole');
const userController = require('../controllers/utilisateurController');

// Routes for all
userRoutes.get('/:id', checkRole([1, 2]), userController.getUser);
userRoutes.put('/:id', checkRole([1, 2]), userController.updateUser);

// Admin routes
userRoutes.get('/', checkRole([1]), userController.getAllUsers);
userRoutes.delete('/:id', checkRole([1]), userController.deleteUser);

module.exports = userRoutes;