import '../styles/forms.css'
import '../styles/styles.css'
import logo from '../assets/logo.svg';
import { useNavigate } from 'react-router-dom';

function Start() {

    const navigate = useNavigate();
    
    return (
    <div className="flex-center start-background">
        <div className="start-container">

            <img className="logo" src={logo} alt="Logo" onClick={() => handleRoute('/start')}></img>
            <h3 className="default-font">AI-Powered Radiology System</h3>
            
            <form className="flex-center">
                <button type="submit" className="filled-button default-font" onClick={() => navigate('/register')}>SIGN UP</button>
                <button type="submit" className="empty-button default-font" onClick={() => navigate('/login')}>LOGIN</button>
                <p className="default-font">OR</p>
                <button type="submit" className="empty-button default-font" onClick={() => navigate('/404')}>REQUEST DEMO</button>
            </form>
            <p className="default-font footer">Dawid Kapcia © 2025</p>
        </div>
    </div>
    );
  }

export default Start;