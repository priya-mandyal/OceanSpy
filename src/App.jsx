import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LiveDetection from './pages/LiveDetection';
import ImageUpload from './pages/UploadImage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/live-detection" element={<LiveDetection />} />
        <Route path="/image-upload" element={<ImageUpload />} />
      </Routes>
    </div>
  );
}

export default App;
