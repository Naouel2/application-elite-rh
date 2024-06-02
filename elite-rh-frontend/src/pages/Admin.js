import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import clock from "../images/clock.png";
import localisation from "../images/localisation.png";
import garbage from "../images/garbage.png";
import collaborator from "../images/collaborator.png";
import email from "../images/email.png";
import ticket from "../images/ticket.png";
import phone from "../images/phone.png";

const Admin = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [reservations, setReservations] = useState([]);

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setUsers(data);
    };

    const fetchReservations = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/reservations`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setReservations(data);
    };
    fetchUsers();
    fetchReservations();
  }, [token]);

  const handleDeleteUser = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de l'utilisateur: ");
      }

      // Update the state to remove the deleted user
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur: ", error);
    }
  };

  const handleDeleteReservation = async (id) => {
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
      <div className="formation-part container">
        <div className="title-searchbar">
          <h2>Espace Administrateur</h2>
        </div>
        <div className="tabs">
          <div className="tabs-switch">
            <button onClick={() => setActiveTab('users')}>Utilisateurs</button>
            <button onClick={() => setActiveTab('reservations')}>Réservations</button>
          </div>
          <button className="button-create" onClick={() => 
            activeTab === 'users' ? navigate('/create-user')
            : navigate('/create-formation')
          }>
            {activeTab === 'users' ? 'Créer Utilisateur' : 'Créer Formation'}
          </button>
        </div>
        <div className="content">
          {activeTab === 'users' && (
            <div className="users-view">
              <h3 className="tab-title">Utilisateurs</h3>
              {users.map(user => (
                <div key={user.id} className="reservation-card">
                  <div className="formation-card-bottom">
                    <h4 className="user-name">{user.prenom_utilisateur} {user.nom_utilisateur}</h4>
                    <div className="date-localisation">
                      <img src={clock} alt="clock" />
                      <p>Créé le : {new Date(user.createdAt).toLocaleDateString('fr-FR')}</p>
                    </div>
                    <div className="date-localisation">
                      <img src={email} alt="email" />
                      <p>Email : {user.email_utilisateur}</p>
                    </div>
                    <div className="date-localisation">
                      <img src={phone} alt="phone" />
                      <p>Téléphone : {user.telephone_utilisateur}</p>
                    </div>
                    <div className="date-localisation">
                      <img src={collaborator} alt="collaborator" />
                      <p>Rôles : {user.role_utilisateurs.map(r => r.role).join(', ')}</p>
                    </div>
                  </div>
                  {userId !== user.id.toString() && (
                    <img
                      src={garbage}
                      alt="delete"
                      className="delete-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteUser(user.id);
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
          {activeTab === 'reservations' && (
            <div className="reservations-view">
              <h3 className="tab-title">Réservations</h3>
              {reservations.map(reservation => (
                <div key={reservation.id} className="reservation-card">
                  <div className="formation-card-bottom">
                    <h3>{reservation.formation.nom_formation}</h3>
                    <div className="date-localisation">
                      <img src={ticket} alt="ticket" />
                      <p>N° réservation : {reservation.numero_reservation}</p>
                    </div>
                    <div className="date-localisation">
                      <img src={collaborator} alt="collaborator" />
                      <p>Utilisateur : {reservation.utilisateur.email_utilisateur}</p>
                    </div>
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
                      handleDeleteReservation(reservation.id);
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Admin;
