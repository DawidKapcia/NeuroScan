import React, { useEffect, useState } from 'react';
import api from '../api';
import '../styles/styles.css';
import '../styles/home.css';
import '../styles/forms.css';
import logo from '../assets/logo2.svg';
import profile from '../assets/profile.svg';
import { useNavigate } from 'react-router-dom';

function AddCase() {

    const navigate = useNavigate();
    const userData = JSON.parse(sessionStorage.getItem('userData'));

    const [formData, setFormData] = useState({
        gender: '',
        birth_date: '',
        scan_date: '',
        risk: null,
        decision: null,
        scan: null
    });

    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.gender !== 'F' && formData.gender !== 'M') {
            setErrorMessage("Invalid gender!");
            return;
        }

        const allowedFileTypes = ['image/jpeg', 'image/png'];
        if (formData.scan && !allowedFileTypes.includes(formData.scan.type)) {
            setErrorMessage("Invalid file type!");
            return;
        }

        const data = new FormData();
        data.append('gender', formData.gender);
        data.append('birth_date', formData.birth_date);
        data.append('scan_date', formData.scan_date);
        data.append('risk', formData.risk);
        data.append('decision', formData.decision);
        data.append('scan', formData.scan);
        data.append('radiologist', userData.id);

        if (errorMessage) {
            return;
        }

        try {
            await api.post("/api/mricases/", data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate("/");

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
                    </form>
                </div>

                <div className="cases-container flex-center">
                    <form className="flex-center" onSubmit={handleSubmit} encType="multipart/form-data">
                        {errorMessage && <p className="warning-box error-message">{errorMessage}</p>}

                        <input type="text" name="gender" placeholder="Gender" maxLength="1" value={formData.gender} onChange={handleChange} required />
                        <input type="text" name="birth_date" placeholder="Date of birth" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} value={formData.birth_date} onChange={handleChange} required />
                        <input type="text" name="scan_date" placeholder="Scan date" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} value={formData.scan_date} onChange={handleChange} required />
                        <input style={{ border: '0px', boxShadow: 'none' }} type="file" name="scan" onChange={handleChange} required />
                        <br />
                        <button type="submit" className="filled-button default-font last-button">CONFIRM</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddCase;