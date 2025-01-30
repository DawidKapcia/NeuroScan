import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import api from "../api";

import '../styles/forms.css'
import '../styles/styles.css'
import logo from '../assets/logo.svg';

function Register() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post("/api/user/register/", { username, email, first_name: firstname, last_name: lastname, password })
            navigate("/login")

        } catch (error) {

            if (error.response && error.response.status === 400) {
                setErrorMessage("User exists!");
            } else {
                setErrorMessage("Something went wrong...");
            }
        }
    };

    return (
    <div className="flex-center start-background">
        <div className="start-container">
            
            <img className="logo" src={logo} alt="Logo" onClick={() => navigate('/start')}></img>
            
            <h3 className="default-font">Sing up to begin your AI journey!</h3>

            {errorMessage && <p className="warning-box error-message">{errorMessage}</p>}
            <form className="flex-center" onSubmit={handleSubmit}>
                
                <input className="default-font" type="text" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input className="default-font" type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input className="default-font" type="text" name="first-name" placeholder="First name" value={firstname} onChange={(e) => setFirstname(e.target.value)} required />
                <input className="default-font" type="text" name="last-name" placeholder="Last name" value={lastname} onChange={(e) => setLastname(e.target.value)} required />
                <input className="default-font password-hidden" type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                <button type="submit" className="filled-button default-font last-button">SIGN UP</button>
            </form>
            
            <p className="default-font">Have an account? <a href="" onClick={() => navigate('/login')}>Login here</a></p>
        </div>
    </div>
    );
}

export default Register;