import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginImage from "../images/loginImage.png";
import logo from "../images/logo.png";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email_utilisateur: email, mdp_utilisateur: password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token); // Save token to localStorage
                localStorage.setItem('userId', data.userId); // Save token to localStorage
                localStorage.setItem('roles', JSON.stringify(data.roles)); // Save token to localStorage
                navigate('/home'); // Redirect to home
            } else {
                const errorData = await response.json();
                setError(errorData.message);
            }
        } catch (err) {
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <img src={logo} alt="logo" />
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        name="email"
                        placeholder="Email..."
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password..."
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <button type="submit">Login</button>
                    {error && <p className="error">{error}</p>}
                </form>
            </div>
            <div className="login-img">
                <img src={loginImage} alt="women" />
            </div>
        </div>
    );
};

export default Login;
