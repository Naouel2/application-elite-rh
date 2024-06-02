import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Components
import Header from "../components/Header";
import Footer from "../components/Footer";
import clock from "../images/clock.png";
import localisation from "../images/localisation.png";
import garbage from "../images/garbage.png";

const Profile = () => {
    const [reservations, setReservations] = useState([]);
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();

    useEffect(() => {
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
            } catch (error) {
                console.error('Erreur lors de la récupération des réservations:', error);
            }
        };
        fetchReservations();
    }, [userId, token]);

    const handleCardClick = (id) => {
        navigate(`/formation/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/reservations/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la suppression de la réservation');
            }

            // Update the state to remove the deleted reservation
            setReservations(reservations.filter(reservation => reservation.id !== id));
        } catch (error) {
            console.error('Erreur lors de la suppression de la réservation:', error);
        }
    };

    return (
        <>
            <Header />
            <div className="formation-part container profile-page">
                <div>
                    <h2>
                        Mes réservations
                    </h2>
                    <div>
                        {reservations.map(reservation => (
                            <div key={reservation.id} className="reservation-card">
                                <div 
                                    className="formation-card-bottom" 
                                    onClick={() => handleCardClick(reservation.formation.id)}
                                >
                                    <h3>{reservation.formation.nom_formation}</h3>
                                    <div className="date-localisation">
                                        <img src={clock} alt="clock" />
                                        <p>{new Date(reservation.formation.date_debut_formation).toLocaleDateString('fr-FR') + ' - ' + new Date(reservation.formation.date_fin_formation).toLocaleDateString('fr-FR')}</p>
                                    </div>
                                    <div className="date-localisation">
                                        <img src={localisation} alt="localisation" />
                                        <p>{reservation.formation.salle.nom_salle} - {reservation.formation.salle.batiment_salle}</p>
                                    </div>
                                </div>
                                <img 
                                    src={garbage} 
                                    alt="delete" 
                                    className="delete-icon" 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(reservation.id);
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Profile;
