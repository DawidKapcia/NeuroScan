import React, { useEffect, useState } from 'react';
import api from '../api';
import '../styles/styles.css';
import '../styles/home.css';
import logo from '../assets/logo2.svg';
import profle from '../assets/profile.svg';
import { useNavigate } from 'react-router-dom';

function Home() {
  
  const navigate = useNavigate();
  const [userData, setUserData] = useState(() => {
      const savedUserData = sessionStorage.getItem('userData');
      return savedUserData ? JSON.parse(savedUserData) : null;
  });

  useEffect(() => {
      if (!userData) {
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

          fetchUserData();
      }
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
          <img className="profile-photo" src={profle} alt="Profile"/>
          <h3 className="default-font bold">{userData ? `${userData.first_name} ${userData.last_name}` : 'Loading...'}</h3>

          <form className="flex-center">
            <button type="submit" className="filled-button default-font add-case-icon" onClick={() => navigate('/addcase')}>ADD CASE</button>
            <button type="submit" className="filled-button default-font home-icon" onClick={() => navigate('/')}>PATIENT LIST</button>
            <button type="submit" className="filled-button default-font contact-icon" onClick={() => navigate('/contact')}>CONTACT</button>
          </form>
        </div>

        <div className="cases-container">
          <div className="cases">
            MRICases
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;