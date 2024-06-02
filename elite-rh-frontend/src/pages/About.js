import Header from "../components/Header";
import Footer from "../components/Footer";

const About = () => {
  return (
    <>
      <Header/>
      <div className="formation-part container">
        <div className="title-searchbar">
          <h2>A propos</h2>
        </div>
        <div className="about-content">
          <p><strong>L'expertise RH à portée de main</strong></p>
          <p>
            Chez Elite RH, nous croyons fermement que le succès d'une entreprise repose sur la qualité de sa gestion des ressources humaines. 
            C'est pourquoi nous nous engageons à fournir une expertise RH de premier ordre, accessible à tous les professionnels désireux de 
            perfectionner leurs compétences et de devenir des leaders dans leur domaine.
          </p>

          <p><strong>Notre Mission</strong></p>
          <p>
            Notre mission est claire : booster vos compétences en gestion des ressources humaines. Elite RH se distingue par son approche 
            personnalisée et ses formations sur mesure, conçues spécifiquement pour les Managers RH. Nous nous efforçons de doter chaque participant 
            des outils et connaissances nécessaires pour exceller dans tous les aspects de la gestion des ressources humaines.
          </p>

          <p><strong>Nos Formations</strong></p>
          <p>
            Nous proposons une gamme complète de formations adaptées aux besoins actuels et futurs des professionnels RH. Que vous souhaitiez 
            améliorer vos compétences en recrutement, approfondir vos connaissances en droit du travail, ou développer vos talents dans d'autres 
            domaines clés des ressources humaines, Elite RH a une formation pour vous.
          </p>

          <p><strong>Développez vos Talents</strong></p>
          <p>
            Les formations Elite RH sont conçues pour transformer les managers RH en acteurs clés de la réussite de leur entreprise. En participant 
            à nos programmes, vous apprendrez à :
          </p>
          <ul>
            <li><strong>Recruter efficacement</strong> : Maîtrisez les techniques avancées de sélection et d'évaluation des candidats pour construire une équipe performante.</li>
            <li><strong>Comprendre le droit du travail</strong> : Familiarisez-vous avec les dernières réglementations et pratiques pour assurer la conformité légale de votre entreprise.</li>
            <li><strong>Gérer la performance</strong> : Développez des stratégies de gestion de la performance qui motivent et inspirent vos employés à donner le meilleur d'eux-mêmes.</li>
            <li><strong>Et bien plus encore</strong> : Nos formations couvrent tous les aspects de la gestion des ressources humaines, vous offrant un ensemble de compétences complet et polyvalent.</li>
          </ul>

          <p><strong>Pourquoi Choisir Elite RH ?</strong></p>
          <p>
            - <strong>Expertise reconnue</strong> : Nos formateurs sont des professionnels expérimentés et reconnus dans le domaine des ressources humaines.<br/>
            - <strong>Approche pratique</strong> : Nous privilégions une approche pratique et interactive pour garantir une application directe des compétences acquises.<br/>
            - <strong>Flexibilité</strong> : Nos formations sont disponibles en présentiel et en ligne, vous permettant de choisir le format qui convient le mieux à vos besoins.
          </p>

          <p>
            Rejoignez Elite RH et donnez à votre carrière en ressources humaines l'impulsion dont elle a besoin pour atteindre de nouveaux sommets. Ensemble, construisons 
            un avenir où l'excellence en gestion des ressources humaines devient la norme.
          </p>
        </div>
      </div>
      <Footer/>
    </>
  )
};

export default About;
