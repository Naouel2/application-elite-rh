const orderid = require('order-id')('key');
const { Reservation, Utilisateur, Formateur, Salle, Formation } = require('../config/index');

exports.createReservation = async (reservationData) => {
    try {
        const reservationId = orderid.generate();
        reservationData.numero_reservation = reservationId;
        const newReservation = await Reservation.create(reservationData);
        return newReservation;
    } catch (error) {
        throw error;
    }
};

exports.getAllReservations = async () => {
    try {
        const reservations = await Reservation.findAll(
            {
                include: [
                    { 
                        model: Formation, 
                        as: 'formation',
                        include: [{
                            model: Salle,
                            as: 'salle'
                        }]
                    },
                    { 
                        model: Utilisateur, 
                        as: 'utilisateur',
                    }
                ]
            }
        );
        return reservations;
    } catch (error) {
        throw error;
    }
};

exports.getReservationById = async (id) => {
    try {
        const reservation = await Reservation.findByPk(id, {
            include: [
                { model: Utilisateur, as: 'utilisateur' },
                { model: Formateur, as: 'formateur' },
                { model: Salle, as: 'salle' },
                { model: Formation, as: 'formation' }
            ]
        });
        return reservation;
    } catch (error) {
        throw error;
    }
};

exports.getReservationsByUser = async (userId) => {
    try {
        const reservations = await Reservation.findAll({
            where: { id_utilisateur: userId },
            include: [
                { 
                    model: Formation, 
                    as: 'formation',
                    include: [{
                        model: Salle,
                        as: 'salle'
                    }]
                }
            ]
        });
        return reservations;
    } catch (error) {
        throw error;
    }
};

exports.updateReservation = async (id, updatedData) => {
    try {
        const reservation = await Reservation.findByPk(id);
        if (!reservation) {
            return null;
        }

        const updatedFields = {}
        for (const key in updatedData) {
            if (key === 'date_debut_formation' || key === 'date_fin_formation') {
                // Convert date strings to Date objects
                updatedFields[key] = new Date(updatedData[key]);
            } else {
                updatedFields[key] = updatedData[key];
            }
        }

        await Reservation.update(updatedFields, { where: { id: id } });
        const updatedReservation = await Reservation.findByPk(id);
        return updatedReservation;
    } catch (error) {
        console.log(error.errors);
        throw error;
    }
};

exports.deleteReservation = async (id) => {
    try {
        const reservation = await Reservation.findByPk(id);
        if (!reservation) {
            return false;
        }
        await Reservation.destroy({ where: { id: id } });
        return true;
    } catch (error) {
        throw error;
    }
};
