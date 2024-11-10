import React from "react";
import { Link } from "react-router-dom";
import PreambleSection from "../components/PreambleSection.js";
import NewsSection from "../components/NewsSection.js";
import AboutUs from "../components/AboutUs.js";
import FAQSection from "../components/FAQSection.js";
import line from "../assets/images/line.png";
import FeaturesSection from "../components/FeatureSection.js";
import ladyImage from "../assets/images/lady.png";
import heroBackground from "../assets/images/hero-background.png";
import ParticleBackground from "../components/ParticleBackground.js";
import { motion, AnimatePresence } from 'framer-motion';
import {useState, useEffect} from 'react';


const facts = [
  "Did you know? The right to freedom of speech is a fundamental right.",
  "Fact: Legal aid is available to those who cannot afford it.",
  "Did you know? You have the right to a fair trial.",
  "Fact: Laws are in place to protect consumer rights.",
  "Did you know? The Constitution is the supreme law of the land."
];

const FactsSlider = ({ facts }) => {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFactIndex((prevIndex) => (prevIndex + 1) % facts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [facts.length]);

  return (
    <div className="bg-gradient-to-r from-[#01161B] to-[#022a33] text-white p-2">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentFactIndex}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center font-semibold mt-32 -mb-32"
          style={{ fontSize: '2rem' }} // Increase font size
        >
          {facts[currentFactIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};


const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#ffffff] text-[#03254e]">
      {/* Hero Section */}
      <section className="h-screen relative flex items-center justify-center gradient-bg">
        
        {/* Background Image with Blur */}
        {/* <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroBackground})`,
            filter: 'blur(3px)',
            zIndex: 0, // Place it behind other content
          }}
        ></div> */}
        <ParticleBackground />

        {/* Foreground Content */}
        <div className="container relative z-10 mx-auto flex md:flex-row items-center justify-between px-4 h-full">
          {/* Left Column with Text and Button */}
          <div className="flex flex-col w-1/2 items-start justify-center p-8">
            <h2 className="text-[6vw] font-bold mb-2 text-left text-[#03254e]">
              Your Rights
            </h2>
            <h2 className="text-[6vw] font-bold mb-2 text-left text-[#03254e]">
              Your Power
            </h2>
            <p className="text-[2vw] mb-6 text-left text-[#545677]">
              <span className="opacity-50">An</span> One-Stop Learning Solution{" "}
              <span className="opacity-50">about<br /> the </span>
              Laws and Rights <span className="opacity-50">that protect you.</span>
            </p>
            <Link
              to="/children"
              className="inline-block px-[2vw] py-[1vw] rounded-lg font-semibold bg-[#69b578] text-[#ffffff] hover:bg-[#03254e] w-3/4"
            >
              <div className="text-center text-2xl">
                Get Started
              </div>
            </Link>
          </div>

          {/* Right Column with Image */}
          <div className="flex w-1/2 justify-end p-8">
            <div className="flex items-start">
              <img src={ladyImage} alt="Illustration of a lady" className="h-screen pt-12" />
            </div>
          </div>
        </div>
      </section>

      {/* Other sections */}
      <section className="bg-[#f0f4f8]">
        <PreambleSection />
      </section>

      <section className="bg-[#ffffff]">
      <NewsSection />
      </section>

      <section>
      <FactsSlider facts={facts} />
      </section>

      <section className="bg-[#ffffff]">
        <FeaturesSection />
      </section>

      <section className="bg-[#f0f4f8]">
        <AboutUs />
      </section>

      <section className="bg-[#ffffff]">
        <FAQSection />
      </section>

      <footer className="bg-[#f0f4f8] text-[#03254e] py-[2vh]">
        <div className="container mx-auto text-center">
          <p className="text-[1.2vw]">
            &copy; {new Date().getFullYear()} Law Aware. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
