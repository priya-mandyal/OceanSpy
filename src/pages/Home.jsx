import React from 'react';
import oceanVideo from '../media/ocean.mp4';
import '../css/Home.css';

function Home() {
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
      </main>
      <footer>
        <p>&copy; 2024 Ocean Pollution Detection Project</p>
        <p>Made by <em>Priya Mandyal</em></p>
      </footer>
    </div>
  );
}

export default Home;
