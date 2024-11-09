import React from 'react';
import Image1 from '../assets/images/image1.jpg'; 
import Image2 from '../assets/images/image2.png';
import Image3 from '../assets/images/image3.png';
import Image4 from '../assets/images/image4.png';
import Image5 from '../assets/images/image5.png';
import Image6 from '../assets/images/image6.png';
import Image7 from '../assets/images/image7.png';
import Image8 from '../assets/images/image8.png';
import Image9 from '../assets/images/image9.png';
import Image10 from '../assets/images/image10.png';
import '../styles/customScrollbar.css'; 

const HeroSection = () => {
  return (
    <header className="text-center bg-gray-800 p-6 rounded-lg w-full md:w-1/2 custom-scrollbar" style={{ maxHeight: '470vh', overflowY: 'auto' }}>
      <h1 className="text-3xl font-bold text-yellow-400">Welcome to the Kids Zone!</h1>
      <p className="mt-2 text-gray-300">Discover fun stories and important lessons about safety, laws, and more!</p>
      <div className="mt-4">
        {[Image1, Image2, Image3, Image4, Image5, Image6, Image7, Image8, Image9, Image10].map((image, index) => (
          <div key={index} className={`w-full ${index % 2 === 0 ? 'mb-4' : ''}`}>
            <img src={image} alt={`Image ${index + 1}`} className="w-full object-cover" />
          </div>
        ))}
      </div>
    </header>
  );
};

export default HeroSection;
