import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import logoutIcon from "../images/logout.png";

const Header = () => {
  const navigate = useNavigate();

  // Get roles from local storage
  const roles = JSON.parse(localStorage.getItem('roles') || '[]');


  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('roles');

    // Redirect to the login page
    navigate('/');
  };

  return (
    <div className="header-container container">
      <Link to="/home">
        <img src={logo} alt="logo" />
      </Link>
      <Link to="/home">Accueil</Link>
      <Link to="/about">À propos</Link>
      <Link to="/compte">Mon compte</Link>
      {roles.includes(1) && (
        <Link to="/admin">Admin</Link>
      )}
      <a href="#" onClick={handleLogout}>
        <img src={logoutIcon} alt="logout" className="logo-header-logout" />
      </a>
    </div>
  );
};

export default Header;
