import React, { useState, useEffect } from "react";
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
import factsData from '../data/facts.json';
import { useSpring, animated } from 'react-spring';

const FactsSlider = ({ facts }) => {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  // Floating effect with react-spring
  const springProps = useSpring({
    from: { transform: 'translateY(0px)' },
    to: { transform: 'translateY(-10px)' },
    config: { tension: 100, friction: 10 },
    reset: true,
    reverse: currentFactIndex % 2 === 0, // Reverse movement direction for variety
    loop: { reverse: true }
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFactIndex((prevIndex) => (prevIndex + 1) % facts.length);
    }, 9000);
    return () => clearInterval(timer);
  }, [facts.length]);

  return (
    <div className="text-[#03254e] p-4 my-8">
      <h2 className="text-6xl font-bold text-center mb-6 merriweather-regular">Facts</h2>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentFactIndex}
          initial={{ opacity: 0, scale: 1 }}
          animate={{
            opacity: 1,
            scale: 1,
            textShadow: [
              '0 0 5px rgba(255, 255, 255, 0.5)', // subtle glow
              '0 0 10px rgba(255, 255, 255, 0.7)', // stronger glow
              '0 0 15px rgba(255, 255, 255, 1)', // maximum glow
              '0 0 20px rgba(255, 255, 255, 1)', // final intense glow
            ], // Neon pulse effect
            transition: {
              textShadow: { duration: 0.6, repeat: Infinity, repeatType: 'loop' }, // Repeat the glow effect
            },
          }}
          exit={{
            opacity: 0,
            scale: 1,
          }}
          transition={{
            duration: 1, // Smooth transition time for enter and exit
          }}
          className="text-center font-semibold mt-32 -mb-32 rounded-xl p-6 hover:text-[#ff6347] transform transition-all duration-300 ease-in-out relative overflow-visible poppins-light"
        >
          {/* Applying react-spring to animate the floating effect */}
          <animated.div
            // style={springProps}
            className="fact-text-content border-4 border-solid border-[#03254e] rounded-xl p-6"
            style={{
              fontSize: '2rem',
              animation: 'shimmer 1.5s linear infinite', // Shimmering text effect
              overflow: 'visible', // Ensure content does not clip
              boxSizing: 'border-box', // Ensures padding + border calculations are correct
            }}
          >
            {facts[currentFactIndex]}
          </animated.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};


const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#F5F5DC] text-[#03254e]">
      {/* Hero Section */}
      <div className="gradient-bg">
        <section className="h-screen relative flex items-center justify-center ">
          <ParticleBackground />
          <div className="container relative z-10 mx-auto flex md:flex-row items-center justify-between px-4 h-full">
            <div className="flex flex-col w-1/2 items-start justify-center p-8">
              <h2 className="text-[6vw] font-bold mb-2 text-left text-[#03254e] merriweather-regular">
                Your Rights
              </h2>
              <h2 className="text-[6vw] font-bold mb-2 text-left text-[#03254e] merriweather-regular">
                Your Power
              </h2>
              <p className="text-[2vw] mb-6 text-left text-[#545677] poppins-regular">
                <span className="opacity-50">A</span> One-Stop Learning Solution{" "}
                <span className="opacity-50">about<br /> the </span>
                Laws and Rights <span className="opacity-50">that protect you.</span>
              </p>
              <Link
                to="/learning"
                className="inline-block px-[2vw] py-[1vw] rounded-lg font-semibold bg-[#69b578] text-[#ffffff] hover:bg-[#03254e] w-3/4"
              >
                <div className="text-center text-2xl poppins-light">
                  Get Started
                </div>
              </Link>
            </div>
            <div className="flex w-1/2 justify-end p-8">
              <div className="flex items-start">
                <img src={ladyImage} alt="Illustration of a lady" className="h-screen pt-24" />
              </div>
            </div>
          </div>
        </section>
        {/* Other sections */}
        <img src={line} className="lines mx-auto" alt="Line separator"></img>  
        <section>
          <PreambleSection />
          <img src={line} className="lines mx-auto" alt="Line separator"></img>  
        </section>
      </div>
      
      <section className="bg-[#F5F5DC] pt-8 pb-8"> {/* Added padding-bottom */}
        <NewsSection />
      </section>

      <section className="bg-[#F5F5DC]">
        <FactsSlider facts={factsData} />
      </section>

      <section className="bg-[#F5F5DC]">
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
