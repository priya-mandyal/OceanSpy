import React, { useState } from 'react';
import axios from 'axios';

const UploadImage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setStatusMessage('Please select an image to upload.');
      return;
    }

    try {
      const reader = new FileReader();

      reader.onloadend = async () => {
        const formData = {
          body: reader.result.split(',')[1]
        };

        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };

        const fileName = selectedFile.name;
        const apiUrl = 'https://s2ks16xf5k.execute-api.us-east-1.amazonaws.com/dev/save-snapshot';
        const queryParams = `?filename=${encodeURIComponent(fileName)}`;
        const url = apiUrl + queryParams;

        try {
          const response = await axios.post(url, formData, config);
          setStatusMessage('Image uploaded successfully.');
          console.log('Response:', response);
        } catch (error) {
          console.error('Error uploading image:', error);
          if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
          }
          setStatusMessage('Error uploading image. Please try again.');
        }
      };

      reader.onerror = () => {
        setStatusMessage('Error reading the image file.');
      };

      reader.readAsDataURL(selectedFile);
    } catch (error) {
      console.error('Error uploading image:', error);
      setStatusMessage('Error uploading image. Please try again.');
    }
  };

  return (
    <div>
      <h1>Upload Image</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {statusMessage && <p>{statusMessage}</p>}
    </div>
  );
};

export default UploadImage;
