import React from 'react';
import justicelady from '../assets/images/justicelady.png';

const AboutUs = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center bg-gray-100 text-gray-800">
      {/* Image on the left */}
      <div className="w-full lg:w-1/2 mb-6 lg:mb-0 flex justify-center h-full">
        <img
          src={justicelady}
          alt="About Us"
          className="rounded-lg max-w-full h-full object-cover"
        />
      </div>

      {/* Text on the right */}
      <div className="w-full lg:w-1/2 lg:pl-8">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-center lg:text-left text-gray-900">
          About Us
        </h2>
        <p className="text-lg lg:text-xl leading-relaxed text-justify text-gray-700">
          At lawAware, our mission is to make legal knowledge accessible, engaging, and practical for Indian citizens. 
          <br /><br />
          Our platform features law-related news, an interactive 'Awareness' section, FAQs, and educational tools like games and videos that simplify legal concepts.
          <br /><br />
          By promoting legal literacy through innovative content, we empower users to make informed decisions, safeguard their rights, and foster trust in the legal system. lawAware encourages civic engagement, helping create a society where citizens are well-informed, legally empowered, and confident in navigating the laws that govern their lives.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
