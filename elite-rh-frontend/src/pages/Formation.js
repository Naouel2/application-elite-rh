import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import formationImg from "../images/formation.jpg";
import Modal from "../components/Modal";

const Formation = () => {
    const [formation, setFormation] = useState({});
    const [reservations, setReservations] = useState([]);
    const [isReserved, setIsReserved] = useState(false);    
    const [showModal, setShowModal] = useState(false);
    const { id } = useParams();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchFormation = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/formations/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des formations');
                }

                const data = await response.json();
                setFormation(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des formations:', error);
            }
        };

        const fetchReservations = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/reservations/user/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des réservations');
                }

                const data = await response.json();
                setReservations(data);
                const reserved = data.some(reservation => reservation.id_formation === parseInt(id));
                setIsReserved(reserved);
            } catch (error) {
                console.error('Erreur lors de la récupération des réservations:', error);
            }
        };

        fetchFormation();
        fetchReservations();
    }, [id, token, userId]);

    const handleReservation = async () => {
        try {
            const reservationData = {
                id_utilisateur: userId,
                id_formation: id,
            };

            const response = await fetch(`${process.env.REACT_APP_API_URL}/reservations`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reservationData)
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la création de la réservation');
            }

            const data = await response.json();
            console.log('data');
            console.log(data);
            alert('Réservation créée avec succès');

            // Update reservations state to include the new reservation
            const updatedReservations = [...reservations, data.reservation];
            setReservations(updatedReservations);

            // Re-check the reservation status immediately after updating reservations
            const reserved = updatedReservations.some(reservation => {
                return parseInt(reservation.id_formation) === parseInt(id)
            });
            setIsReserved(reserved);
        } catch (error) {
            console.error('Erreur lors de la création de la réservation:', error);
            alert('Erreur lors de la création de la réservation');
        }
    };

    const handleModalClose = () => setShowModal(false);
    const handleModalConfirm = () => {
        setShowModal(false);
        handleReservation();
    };

    return (
        <div className={showModal ? "formation-modal" : "formation-normal"}>
            <Header />
            <div className="formation-detail">
                <img src={formationImg} alt="formation" />
                <div className="formation-bord">
                    <div>
                        <h2>{formation.nom_formation}</h2>
                        <h3>{formation.domaine_formation}</h3>
                        <p>{formation.description_formation}</p>
                    </div>
                    <div>
                        <h3>Dates</h3>
                        <p>
                            {new Date(formation.date_debut_formation).toLocaleDateString('fr-FR') + ' - ' + new Date(formation.date_fin_formation).toLocaleDateString('fr-FR')}
                        </p>
                        <button className={isReserved ? "disabled-button" : ""} onClick={() => setShowModal(true)} disabled={isReserved}>
                            {isReserved ? "Réservé" : "Réserver"}
                        </button>
                    </div>
                </div>
            </div>
            <Modal show={showModal} onClose={handleModalClose} onConfirm={handleModalConfirm} />
            <Footer />
        </div>
    );
};

export default Formation;
