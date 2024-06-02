import React, { useState, useEffect } from 'react';
import clock from "../images/clock.png" 
import localisation from "../images/localisation.png" 


const FormationCard = ({ onClick }) => {
   const [formations, setFormations] = useState([]);

   useEffect(() => {
      const fetchFormations = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch(`${process.env.REACT_APP_API_URL}/formations`, {
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
          setFormations(data);
        } catch (error) {
          console.error('Erreur lors de la récupération des formations:', error);
        }
      }; 
      fetchFormations();
    }, []);

    return (
      <>
        {formations.map((formation) => (
        <div key={formation.id} className="formation-card" onClick={() => onClick(formation.id)}>
          <div className="formation-card-bottom">
            <h3>{formation.nom_formation}</h3>
            <div className="date-localisation">
              <img src={clock} alt="clock" />
              <p>{new Date(formation.date_debut_formation).toLocaleDateString('fr-FR') + ' - ' + new Date(formation.date_fin_formation).toLocaleDateString('fr-FR')}</p>
            </div>
            <div className="date-localisation">
              <img src={localisation} alt="localisation" />
              <p>{formation.salle.nom_salle}</p>
            </div>
          </div>
        </div>
      ))} 
      </>       
    )

}

export default FormationCard;