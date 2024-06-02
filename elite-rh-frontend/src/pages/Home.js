
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

// Components
import Header from "../components/Header"
import MainHeadline from "../components/MainHeadline";
import FormationCard from "../components/FormationCard";
import Footer from "../components/Footer";


const Home = () => {
    const [inputValue, setInputValue] = useState("");
    const handleChange = (e) => setInputValue(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        setInputValue("");
      };

      const navigate = useNavigate();
      const handleCardClick = (formationId) => {
        navigate(`/formation/${formationId}`);
      };
      
    return (
        <>
            <Header/>
            <MainHeadline/>
            <div className="formation-part container">
                <div className="title-searchbar">
                    <h2 className="home-title">
                        Nos formations
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <input
                        type="text"
                        placeholder="Rechercher une formation..."
                        value={inputValue}
                        onChange={handleChange}
                        />
                         <button type="submit">
                        Rechercher
                        </button>
                    </form>
                </div>
                <FormationCard onClick={handleCardClick}/> 
            </div>
      
         <Footer/>
        </>
       
    )

}

export default Home;