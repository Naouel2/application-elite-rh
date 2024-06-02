const express = require('express');
const router = express.Router();
const checkRole = require('../middleware/checkRole');
const reservationController = require('../controllers/reservationController');

// Create reservation (avec MiddleWare)
router.post('/', checkRole([1, 2]), reservationController.createReservation);

// Get all reservations
router.get('/', checkRole([1]), reservationController.getAllReservations);

// Get 1 reservation by ID
router.get('/:id', checkRole([1, 2]), reservationController.getReservationById);

router.get('/user/:userId', checkRole([1, 2]),reservationController.getReservationsByUser);

// Update a reservation by ID
router.put('/:id', checkRole([1, 2]), reservationController.updateReservation);

// Delete a réservation by ID
router.delete('/:id', checkRole([1, 2]), reservationController.deleteReservation);

module.exports = router;
