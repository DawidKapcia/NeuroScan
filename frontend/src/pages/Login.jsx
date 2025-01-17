import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import api from "../api";

import '../styles/forms.css'
import '../styles/styles.css'
import logo from '../assets/logo.svg';

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/api/token/", { username, password })
            localStorage.setItem(ACCESS_TOKEN, res.data.access);
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
            navigate("/")

        } catch (error) {
            setErrorMessage("Invalid credentials!");
        }
    };

    return (
    <div className="flex-center start-background">
        <div className="start-container">

            <img className="logo" src={logo} alt="Logo" onClick={() => navigate('/start')}></img>

            <h3 style={{ marginBottom: '-1vh' }} className="default-font">Welcome back!</h3>
            <h3 className="default-font">Please login to continue</h3>
            
            {errorMessage && <p className="warning-box error-message">{errorMessage}</p>}
            <form className="flex-center" onSubmit={handleSubmit}>

                <input className="default-font" type="text" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input className="default-font password-hidden" type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                <p className="default-font"><a href="" onClick={() => navigate('/404')}>Forgot password?</a></p>

                <button type="submit" className="filled-button default-font last-button">LOGIN</button>
            </form>
            <p>Not a member? <a href="" onClick={() => navigate('/register')}>Create an account</a></p>
        </div>
    </div>
    );
}

export default Login;