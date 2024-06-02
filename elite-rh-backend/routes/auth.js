const express = require('express');
const checkRole = require('../middleware/checkRole');
const checkAuth = require('../middleware/checkAuth');
const authController = require('../controllers/authController');

const authRoutes = express.Router();

// POST /login
authRoutes.post('/login', authController.logUser);

// Register a new user POST /register
authRoutes.post('/register', authController.createUser);

module.exports = authRoutes;
