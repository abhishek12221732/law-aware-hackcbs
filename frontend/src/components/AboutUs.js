import React, { useState, useEffect } from 'react';
import justicelady from '../assets/images/justicelady.png';

const AboutUs = () => {
  const content = `At lawAware, our mission is to make legal knowledge accessible, engaging, and practical for Indian citizens.
  Our platform features law-related news, an interactive 'Awareness' section, FAQs, and educational tools like games and videos that simplify legal concepts.
  By promoting legal literacy through innovative content, we empower users to make informed decisions, safeguard their rights, and foster trust in the legal system. lawAware encourages civic engagement, helping create a society where citizens are well-informed, legally empowered, and confident in navigating the laws that govern their lives.`;

  // Split the content into individual words
  const words = content.split(' ');

  // Bird-like floating effect on load
  const [float, setFloat] = useState(false);

  useEffect(() => {
    setFloat(true);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center bg-gradient-to-r from-green-50 via-yellow-100 to-lime-200 text-gray-800 py-12 px-6 lg:px-20">
      {/* Image on the left with bird-like transition, positioned at the bottom */}
      <div
        className={`w-full lg:w-1/2 mb-6 lg:mb-0 flex justify-center h-full items-end transition-transform duration-700 ease-in-out transform hover:scale-105 ${float ? 'animate-float' : ''}`}
      >
        <img
          src={justicelady}
          alt="About Us"
          className="rounded-lg max-w-full h-auto object-cover transition-all duration-500 ease-in-out transform hover:rotate-2"
        />
      </div>

      {/* Text on the right with word transition */}
      <div className="w-full lg:w-1/2 lg:pl-12 text-center lg:text-left">
        <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-500">
          About Us
        </h2>
        <p className="text-lg lg:text-xl leading-relaxed text-justify text-gray-700">
          {words.map((word, index) => (
            <span
              key={index}
              className="inline-block transition-all duration-300 ease-in-out hover:text-teal-600 hover:-translate-y-1 mx-1 text-gray-900"
            >
              {word}{' '}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
