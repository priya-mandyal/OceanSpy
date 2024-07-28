// import React, { useEffect, useRef, useState } from 'react'; // Correct placement of imports
// import axios from 'axios';
// import { SlHome } from 'react-icons/sl';
// import { useNavigate } from 'react-router-dom';
// import '../css/LiveDetection.css'; // Make sure the path is correct

// function LiveDetection() {
//   const [stream, setStream] = useState(null);
//   const [captureInterval, setCaptureInterval] = useState(30000); // 30 seconds
//   const videoRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const startWebcam = async () => {
//       try {
//         const constraints = {
//           video: {
//             facingMode: 'environment', // Use the back camera if available
//             width: { ideal: 1280 },
//             height: { ideal: 720 }
//           }
//         };

//         const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
//         setStream(mediaStream);

//         if (videoRef.current) {
//           videoRef.current.srcObject = mediaStream;
//           videoRef.current.play();
//         }

//         const intervalId = setInterval(() => {
//           captureImage(mediaStream);
//         }, captureInterval);

//         // Cleanup function to stop webcam and clear interval
//         return () => {
//           clearInterval(intervalId);
//           mediaStream.getTracks().forEach(track => track.stop());
//         };
//       } catch (error) {
//         console.error('Error accessing webcam:', error);
//       }
//     };

//     startWebcam();

//     // Cleanup function to stop webcam when component unmounts
//     return () => {
//       if (stream) {
//         stream.getTracks().forEach(track => track.stop());
//       }
//     };
//   }, [captureInterval]);

//   const captureImage = async (mediaStream) => {
//     const canvas = document.createElement('canvas');
//     const context = canvas.getContext('2d');
//     const video = videoRef.current;

//     if (video && context) {
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;
//       context.drawImage(video, 0, 0, canvas.width, canvas.height);

//       const base64Image = canvas.toDataURL('image/jpeg');
//       const payload = {
//         image: base64Image.split(',')[1],
//         filename: `snapshot-${new Date().toISOString()}.jpg`
//       };

//       try {
//         const response = await axios.post(
//           'https://s2ks16xf5k.execute-api.us-east-1.amazonaws.com/dev/save-snapshot',
//           payload,
//           {
//             headers: {
//               'Content-Type': 'application/json'
//             }
//           }
//         );

//         if (response.status === 200) {
//           console.log('Image uploaded successfully!');
//         } else {
//           console.error('Error uploading image:', response.statusText);
//         }
//       } catch (error) {
//         console.error('Error uploading image:', error);
//       }
//     }
//   };

//   return (
//     <div className="page-container">
//       <div className="home-icon" onClick={() => navigate('/')}>
//         <SlHome />
//       </div>
//       <div className="live-detection-container">
//         <h2>Live Detection</h2>
//         <video ref={videoRef} width="640" height="480" autoPlay></video>
//       </div>
//     </div>
//   );
// }

// export default LiveDetection;
import React from 'react'; // Correct placement of imports
import { SlHome } from 'react-icons/sl';
import { useNavigate } from 'react-router-dom';
import '../css/LiveDetection.css'; // Make sure the path is correct

function LiveDetection() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <div className="home-icon" onClick={() => navigate('/')}>
        <SlHome />
      </div>
      <div className="live-detection-container">
        <h2>Live Detection</h2>
        <p>Live detection is yet to be implemented.</p>
      </div>
    </div>
  );
}

export default LiveDetection;
