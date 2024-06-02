//images
import womanCorporate from "../images/womanCorporate.jpg"

const MainHeadline = () => {

    return (
        <div className="main-headline">
        <div>
            <h1>L'expertise RH <span>à portée de main</span></h1>
            <p>Boostez vos compétences en gestion des ressources humaines  ! Notre centre Elite RH propose des formations sur mesure pour les Managers RH, afin de les aider à exceller dans leur domaine. Développez vos talents en recrutement, droit du travail, et bien plus encore, pour être un acteur clé dans la réussite de votre entreprise.</p>
        </div>
        <div>
        <img src={womanCorporate} alt="femme souriante devant un écran" className="logo-headline" />
        </div>
    </div>
    )

}

export default MainHeadline;