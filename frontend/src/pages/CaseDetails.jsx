import React from 'react';
import '../styles/styles.css';
import '../styles/home.css';
import '../styles/forms.css';
import '../styles/details.css';
import api from '../api';
import logo from '../assets/logo2.svg';
import profile from '../assets/profile.svg';
import gradScan from '../assets/grad_scan.svg';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


function CaseDetails() {
    const navigate = useNavigate();
    const location = useLocation();
    const { caseData } = location.state;
    const userData = JSON.parse(sessionStorage.getItem('userData'));

    const handleIdentify = async (value) => {
        try {
            const response = await api.put(`/api/mricases/update/${caseData.id}/`, {
                gender: caseData.gender,
                birth_date: caseData.birth_date,
                scan_date: caseData.scan_date,
                decision: value
            });
            if (response.status === 200) {
                navigate('/');
            }
        } catch (error) {
            console.error('Error updating case decision:', error);
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

                <div className="flex-center flex-overlow cases">
                    <br></br>
                    <h1 className="default-font">Case Information</h1>
                    <table>
                        <tbody>
                            <tr>
                                <td>ID</td>
                                <td>{caseData.id}</td>
                            </tr>
                            <tr>
                                <td>Gender</td>
                                <td>{caseData.gender}</td>
                            </tr>
                            <tr>
                                <td>Birth Date</td>
                                <td>{caseData.birth_date}</td>
                            </tr>
                            <tr>
                                <td>Scan Date</td>
                                <td>{caseData.scan_date}</td>
                            </tr>
                            <tr>
                                <td>Risk</td>
                                <td>{caseData.risk}</td>
                            </tr>
                            <tr>
                                <td>Decision</td>
                                <td>{caseData.decision}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="flex-details">
                        <img className="scan-image" src={caseData.scan} alt="Scan" />
                        <img className="scan-image" src={gradScan} alt="Scan" />
                    </div>
                    <br></br>
                    <br></br>
                    <div className="flex-details">
                        <button type="submit" className="button-red default-font" onClick={() => handleIdentify('Y')}>IDENTIFIED</button>
                        <button type="submit" className="button-green default-font" onClick={() => handleIdentify('N')}>UNIDENTIFIED</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CaseDetails;