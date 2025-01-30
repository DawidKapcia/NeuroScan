import React, { useState } from 'react';
import '../styles/styles.css';
import '../styles/home.css';
import logo from '../assets/logo2.svg';
import profile from '../assets/profile.svg';
import { useNavigate } from 'react-router-dom';
import api from "../api";

function RemoveUser() {

    const navigate = useNavigate();
    const userData = JSON.parse(sessionStorage.getItem('userData'));

    const [username, SetUsername] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (username) => {
        setErrorMessage("");

        try {
            const response = await api.delete(`/api/user/delete/${username}/`);

            if (response.status === 403) {
                setErrorMessage("No permission!");

            } else if (response.status !== 204) {
                setErrorMessage("Something went wrong...");
            }

            navigate("/")
            
        } catch (error) {
            setErrorMessage("Something went wrong...");
        }
    };
    return (
        <div className="base-container">
            <div className="flex-row-left-center header">
                <img className="logo" src={logo} alt="Logo" />
                <a href="logout"><button type="submit" className="logout"></button></a>
            </div>

            <div className="lower-container">
                <div className="flex-left-center nav-bar">
                    <img className="profile-photo" src={profile} alt="Profile"/>
                    <h3 className="default-font bold">{userData ? `${userData.first_name} ${userData.last_name}` : 'Loading...'}</h3>

                    <form className="flex-center">
                    <button type="submit" className="filled-button default-font add-case-icon" onClick={() => navigate('/addcase')}>ADD CASE</button>
                    <button type="submit" className="filled-button default-font home-icon" onClick={() => navigate('/')}>PATIENT LIST</button>
                    <button type="submit" className="filled-button default-font contact-icon" onClick={() => navigate('/contact')}>CONTACT</button>
                    <br></br><br></br>
                    <button type="submit" className="filled-button default-font remove-case-icon" onClick={() => navigate('/removecase')}>REMOVE CASE</button>
                    <button type="submit" className="filled-button default-font remove-user-icon" onClick={() => navigate('/removeuser')}>REMOVE USER</button>
                    </form>
                </div>

                <div className="cases-container flex-center">
                    <form className="flex-center" method="DELETE" onSubmit={(e) => { e.preventDefault(); handleSubmit(username); }}>
                        {errorMessage && <p className="warning-box error-message">{errorMessage}</p>}
                        <input type="text" name="id" placeholder="Username" min="40" onChange={(e) => SetUsername(e.target.value)} required />
                        <br />
                        <button type="submit" className="filled-button default-font last-button">CONFIRM</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RemoveUser;
