const reservationService = require('../services/reservationService');

exports.createReservation = async (req, res) => {
    try {
        const newReservation = await reservationService.createReservation(req.body);
        res.status(201).json({
            message: 'Reservation created successfully!',
            reservation: newReservation
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await reservationService.getAllReservations();
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getReservationById = async (req, res) => {
    try {
        const { id } = req.params;
        const reservation = await reservationService.getReservationById(id);
        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getReservationsByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const reservations = await reservationService.getReservationsByUser(userId);
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateReservation = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedReservation = await reservationService.updateReservation(id, updatedData);
        if (!updatedReservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        res.status(200).json({
            message: 'Reservation updated successfully!',
            reservation: updatedReservation
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteReservation = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await reservationService.deleteReservation(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        res.status(200).json({ message: 'Reservation deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
