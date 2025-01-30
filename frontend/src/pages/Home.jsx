import React, { useEffect, useState } from 'react';
import api from '../api';
import '../styles/styles.css';
import '../styles/home.css';
import logo from '../assets/logo2.svg';
import profle from '../assets/profile.svg';
import { useNavigate } from 'react-router-dom';
import Case from '../components/Case';

function Home() {
  
  const navigate = useNavigate();
  const [userData, setUserData] = useState(() => {
    const savedUserData = sessionStorage.getItem('userData');
    return savedUserData ? JSON.parse(savedUserData) : null;
  });

  const [cases, setCases] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('api/user/');
        const data = response.data;
        setUserData(data);
        sessionStorage.setItem('userData', JSON.stringify(data));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchCases = async () => {
      try {
        const response = await api.get('api/mricases/all');
        setCases(response.data);
      } catch (error) {
        console.error('Error fetching cases:', error);
      }
    };

    if (!userData) {
      fetchUserData();
    }

    fetchCases();
  }, [userData]);

  return (
  <div className="base-container">
    <div className="flex-row-left-center header">
      <img className="logo" src={logo} alt="Logo" />
      <input placeholder="Search for a patient..." />
      <a href="logout"><button type="submit" className="logout"></button></a>
    </div>

    <div className="lower-container">
      <div className="flex-left-center nav-bar">
        <img className="profile-photo" src={profle} alt="Profile" />
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

      <div className="cases-container">
        <div className="cases">
          <table className="cases-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Gender</th>
                <th>DOB</th>
                <th>Scan date</th>
                <th>Risk</th>
                <th>Decision</th>
              </tr>
            </thead>
            <tbody>
              {cases.map((caseData) => (
                <Case key={caseData.id} caseData={caseData} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Home;
