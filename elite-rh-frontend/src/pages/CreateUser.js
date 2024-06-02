import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import Header from "../components/Header";
import Footer from "../components/Footer";
import '../App.css';

const CreateFormation = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    prenom_utilisateur: '',
    nom_utilisateur: '',
    email_utilisateur: '',
    telephone_utilisateur: '',
    roles: []
  });

  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/roles`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        const formattedRoles = data.roles.map(role => ({
          value: role.id,
          label: role.role
        }));
        setRoles(formattedRoles);
      } catch (error) {
        console.error('Erreur lors de la récupération des rôles:', error);
      }
    };

    fetchRoles();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleRoleChange = (selectedOptions) => {
    const selectedRoles = selectedOptions ? selectedOptions.map(option => option.label) : [];
    setUser((prevUser) => ({
      ...prevUser,
      roles: selectedRoles
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création de l\'utilisateur');
      }

      navigate('/admin');
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur:', error);
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
              <label>Prénom:</label>
              <input type="text" name="prenom_utilisateur" value={user.prenom_utilisateur} onChange={handleChange} />
            </div>
            <div>
              <label>Nom:</label>
              <input type="text" name="nom_utilisateur" value={user.nom_utilisateur} onChange={handleChange} />
            </div>
            <div>
              <label>Email:</label>
              <input type="email" name="email_utilisateur" value={user.email_utilisateur} onChange={handleChange} />
            </div>
            <div>
              <label>Téléphone:</label>
              <input className="tel-input" type="tel" name="telephone_utilisateur" value={user.telephone_utilisateur} onChange={handleChange} />
            </div>
            <div>
              <label>Rôles:</label>
              <Select
                isMulti
                name="roles"
                options={roles}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleRoleChange}
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
