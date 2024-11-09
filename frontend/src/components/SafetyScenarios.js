import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Simg1 from '../assets/images/s01.jpeg';
import Simg2 from '../assets/images/s02.jpeg';
import Simg3 from '../assets/images/s03.jpeg';

const SafetyScenarios = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [selectDescription, setSelectDescription] = useState("");

  const handleImageClick = (image, title, description) => {
    setSelectedImage(image);
    setSelectedTitle(title);
    setSelectDescription(description);
  };

  const handleClosePopup = () => {
    setSelectedImage(null);
    setSelectedTitle(null);
    setSelectDescription("");
  };

  const scenarios = [
    { image: Simg1, title: "What to Do if You’re Lost", description: "Essential tips to help you stay calm and find your way back when lost in unfamiliar surroundings." },
    { image: Simg2, title: "Stranger Danger", description: "Key strategies for recognizing potential threats from strangers and staying safe in social situations." },
    { image: Simg3, title: "Online Safety Tips", description: "Practical advice for protecting your personal information and navigating the digital world securely." }
  ];

  return (
    <section className="bg-[#FFF0C2] p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-[#FFA69E] mb-4">Safety Scenarios</h2>
      <div className="flex flex-wrap justify-center">
        {scenarios.map(({ image, title, description }, index) => (
          <motion.div
            key={index}
            className="mx-2" 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={image}
              alt={`Safety Scenario ${index + 1}`}
              className="w-full object-cover cursor-pointer"
              onClick={() => handleImageClick(image, title, description)}
            />
          </motion.div>
        ))}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={handleClosePopup}>✖</button>
            <img src={selectedImage} alt="Selected" className="w-full object-cover mb-4" />
            <h3 className="text-lg font-semibold">{selectedTitle}</h3>
            <p className="mt-2">{selectDescription}</p>
            <button className="mt-4 px-4 py-2 bg-[#FFA69E] text-white rounded" onClick={handleClosePopup}>Back</button>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default SafetyScenarios;
