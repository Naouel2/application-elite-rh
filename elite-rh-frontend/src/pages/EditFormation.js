import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import Header from "../components/Header";
import Footer from "../components/Footer";
import '../App.css';

const EditFormation = () => {
  const { id } = useParams();
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFormation = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/formations/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();

        setFormation({
          nom_formation: data.nom_formation,
          domaine_formation: data.domaine_formation,
          description_formation: data.description_formation,
          date_debut_formation: data.date_debut_formation.split('T')[0],
          date_fin_formation: data.date_fin_formation.split('T')[0],
          id_salle: data.salle.id,
          id_formateur: data.id_formateur
        });

        await fetchSallesAndFormateurs(token, data.salle.id, data.id_formateur);

      } catch (error) {
        console.error('Erreur lors de la récupération de la formation:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchSallesAndFormateurs = async (token, currentSalleId, currentFormateurId) => {
      try {
        const [sallesResponse, formateursResponse] = await Promise.all([
          fetch(`${process.env.REACT_APP_API_URL}/salles`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }),
          fetch(`${process.env.REACT_APP_API_URL}/formateurs`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          })
        ]);

        const sallesData = await sallesResponse.json();
        const formateursData = await formateursResponse.json();

        const formattedSalles = sallesData.salles.map(salle => ({
          value: salle.id,
          label: `${salle.nom_salle} - ${salle.batiment_salle}`
        }));

        const formattedFormateurs = formateursData.formateurs.map(formateur => ({
          value: formateur.id,
          label: `${formateur.prenom_formateur} ${formateur.nom_formateur} - ${formateur.specialite_formateur}`
        }));

        setSalles(formattedSalles);
        setFormateurs(formattedFormateurs);

      } catch (error) {
        console.error('Erreur lors de la récupération des salles et formateurs:', error);
      }
    };

    fetchFormation();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormation((prevFormation) => ({
      ...prevFormation,
      [name]: value
    }));
  };

  const handleSalleChange = (selectedOption) => {
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

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/formations/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formation)
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour de la formation');
      }

      navigate('/home');
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la formation:', error);
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <>
      <Header />
      <div className="formation-part container">
        <div className="title-searchbar">
          <h2>Espace Administrateur</h2>
        </div>
        <h3>Modifier Formation</h3>
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
                value={salles.find(option => option.value === formation.id_salle)}
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
                value={formateurs.find(option => option.value === formation.id_formateur)}
                options={formateurs}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleFormateurChange}
              />
            </div>
            <button type="submit">Mettre à jour</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditFormation;
