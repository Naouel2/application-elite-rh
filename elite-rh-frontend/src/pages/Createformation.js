import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import Header from "../components/Header";
import Footer from "../components/Footer";
import '../App.css';

const CreateFormation = () => {
  const navigate = useNavigate();

  const [formation, setFormation] = useState({
    nom_formation: '',
    domaine_formation: '',
    description_formation: '',
    date_debut_formation: '',
    date_fin_formation: '',
    id_salle: 0,
    id_formateur: 0
  });

  const [salles, setSalles] = useState([]);
  const [formateurs, setFormateurs] = useState([]);

  useEffect(() => {
    const fetchSalles = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/salles`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        const formattedSalles = data.salles.map(salle => ({
          value: salle.id,
          label: salle.nom_salle
        }));
        setSalles(formattedSalles);
      } catch (error) {
        console.error('Erreur lors de la récupération des salles:', error);
      }
    };

    fetchSalles();
  }, []);

  useEffect(() => {
    const fetchFormateurs = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/formateurs`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        const formattedFormateurs = data.formateurs.map(formateur => ({
          value: formateur.id,
          label: `${formateur.prenom_formateur} ${formateur.nom_formateur} - ${formateur.specialite_formateur}`
        }));
        setFormateurs(formattedFormateurs);
      } catch (error) {
        console.error('Erreur lors de la récupération des formateurs:', error);
      }
    };

    fetchFormateurs();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormation((prevFormation) => ({
      ...prevFormation,
      [name]: value
    }));
    console.log(formation);
  };

  const handleSalleChange = (selectedOption) => {
    console.log(selectedOption);
    const selectedSalle = selectedOption ? selectedOption.value : 0;
    setFormation((prevFormation) => ({
        ...prevFormation,
        id_salle: selectedSalle
      }));
  };

  const handleFormateurChange = (selectedOption) => {
    const selectedFormateur = selectedOption ? selectedOption.value : 0;
    setFormation((prevFormation) => ({
        ...prevFormation,
        id_formateur: selectedFormateur
      }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    console.log(formation);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/formations`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formation)
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création de la formation');
      }

      navigate('/home');
    } catch (error) {
      console.error('Erreur lors de la création de la formation:', error);
    }
  };

  return (
    <>
      <Header />
      <div className="formation-part container">
        <div className="title-searchbar">
          <h2>Espace Administrateur</h2>
        </div>
        <h3>Créer Formation</h3>
        <div className="users-view">
          <form onSubmit={handleSubmit}>
            <div>
              <label>Nom de la formation:</label>
              <input type="text" name="nom_formation" value={formation.nom_formation} onChange={handleChange} />
            </div>
            <div>
              <label>Domaine:</label>
              <input type="text" name="domaine_formation" value={formation.domaine_formation} onChange={handleChange} />
            </div>
            <div>
              <label>Description:</label>
              <textarea name="description_formation" value={formation.description_formation} onChange={handleChange} />
            </div>
            <div>
              <label>Date de début:</label>
              <input className="date-input" type="date" name="date_debut_formation" value={formation.date_debut_formation} onChange={handleChange} />
            </div>
            <div>
              <label>Date de fin:</label>
              <input className="date-input" type="date" name="date_fin_formation" value={formation.date_fin_formation} onChange={handleChange} />
            </div>
            <div>
              <label>Salle:</label>
              <Select
                name="salles"
                options={salles}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleSalleChange}
              />
            </div>
            <div>
              <label>Formateur:</label>
              <Select
                name="formateurs"
                options={formateurs}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleFormateurChange}
              />
            </div>
            <button type="submit">Créer</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreateFormation;
