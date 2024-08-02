import React, { useState } from 'react';
import axios from 'axios';
import oceanVideo from '../media/ocean.mp4';
import '../css/Home.css';

function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubscribe = async () => {
    if (!validateEmail(email)) {
        setErrorMessage('Please enter a valid email address.');
        setSuccessMessage('');
        return;
    }
    setErrorMessage('');
    setSuccessMessage('');

    try {
        const response = await axios.get('https://ebz4vnzxcf.execute-api.us-east-1.amazonaws.com/dev/subscribe-to-topic', {
            params: { email }
        });

        if (response.status === 200) {
            setSuccessMessage('Subscription successful!');
            setEmail('');
            setTimeout(() => setShowPopup(false), 2000); // Close popup after 2 seconds
        } else {
            setErrorMessage('Subscription failed. Please try again.');
        }
    } catch (error) {
        setErrorMessage('An error occurred. Please try again.');
        setSuccessMessage('');
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setErrorMessage('');
    setSuccessMessage('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ocean Pollution Detection</h1>
      </header>
      <main>
        <div className="hero">
          <video autoPlay muted loop id="ocean-video">
            <source src={oceanVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="caption">
            <h2>Detecting is the first step to saving.</h2>
            <p>This project is a small but an important effort to protect ocean life.</p>
          </div>
        </div>
        <div className="options">
          <button onClick={() => window.location.href='/live-detection'}>Live Detection</button>
          <button onClick={() => window.location.href='/image-upload'}>Upload Image</button>
        </div>
        <div className="subscribe-section">
          <button onClick={() => setShowPopup(true)}>Subscribe for Notifications</button>
        </div>
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <button className="popup-close" onClick={handleClosePopup}>×</button>
              <h2>Subscribe to Notifications</h2>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
              <button onClick={handleSubscribe}>Subscribe</button>
              {errorMessage && <div className="error-message">{errorMessage}</div>}
              {successMessage && <div className="alert-success">{successMessage}</div>}
            </div>
          </div>
        )}
      </main>
      <footer>
        <p>&copy; 2024 Ocean Pollution Detection Project</p>
        <p>Made by <em>Priya Mandyal</em></p>
      </footer>
    </div>
  );
}

export default Home;
