
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

// Components
import Header from "../components/Header"
import MainHeadline from "../components/MainHeadline";
import FormationCard from "../components/FormationCard";
import Footer from "../components/Footer";


const Home = () => {
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
                </div>
                <FormationCard onClick={handleCardClick}/> 
            </div>
      
         <Footer/>
        </>
       
    )

}

export default Home;