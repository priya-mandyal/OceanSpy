import React, { useState } from 'react';
import { SlHome } from 'react-icons/sl';
import { useNavigate } from 'react-router-dom';
import '../css/UploadImage.css';
import axios from 'axios';

function UploadImage() {
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleUploadClick = () => {
    document.getElementById('file-input').click();
  };

  const handleSubmit = async () => {
    if (imageFile) {
      try {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64String = reader.result.split(',')[1];
          const filename = imageFile.name;
          const payload = {
            image: base64String,
            filename: filename
          };

          const response = await axios.post(
            'https://s2ks16xf5k.execute-api.us-east-1.amazonaws.com/dev/save-snapshot',
            payload,
            {
              headers: {
                'Content-Type': 'application/json'
              }
            }
          );

          if (response.status === 200) {
            setUploadSuccess(true);
            setTimeout(() => {
              setUploadSuccess(false);
            }, 3000);
          } else {
            console.error('Error uploading image');
          }
        };
        reader.readAsDataURL(imageFile);
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      console.log('No image selected.');
    }
  };

  return (
    <div className="page-container">
      <div className="home-icon" onClick={() => navigate('/')}>
        <SlHome />
      </div>
      <div className="upload-image-container">
        <div className="header-container">
          <h2>Upload Image</h2>
        </div>
        {uploadSuccess && <div className="alert-success">Image uploaded successfully!</div>}
        <input 
          type="file" 
          id="file-input"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
        <button onClick={handleUploadClick} className="upload-button">
          Choose Image
        </button>
        <button onClick={handleSubmit} className="upload-button">
          Upload
        </button>
        {image && (
          <div className="image-thumbnail">
            <p>Selected Image</p>
            <img src={image} alt="Selected" />
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadImage;
