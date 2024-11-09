import React from "react";
import { Link } from "react-router-dom";
import PreambleSection from "../components/PreambleSection.js";
import NewsSection from "../components/NewsSection.js";
import AboutUs from "../components/AboutUs.js";
import FAQSection from "../components/FAQSection.js";
import line from "../assets/images/line.png";
import FeaturesSection from "../components/FeatureSection.js";
import homeBgImage from "../assets/images/homebg2.png"; 

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#01161B] text-gray-300">
      {/* Hero Section */}
      <section
        className="h-screen flex items-center justify-center relative"
        style={{
          backgroundImage: `url(${homeBgImage})`, 
          backgroundSize: "cover",
          backgroundPosition: "center", 
        }}
      >
        <div className="container mx-auto flex flex-col md:flex-row items-start justify-between px-4 h-full mt-96"> {/* Full height container */}
          <div className="flex flex-col w-1/2 items-start justify-start p-8"> {/* Left Column */}
            <h2 className="text-[4vw] font-bold mb-2 text-left hero-heading">
              Your Rights
            </h2>
          </div>
          <div className="flex flex-col w-1/2 items-end justify-start p-8"> {/* Right Column */}
            <h2 className="text-[4vw] font-bold mb-2 text-right hero-heading">
              Your Power
            </h2>
          </div>
        </div>

        {/* Remaining Text and Button in Center */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center"> {/* Centered button */}
          <p className="text-[2vw] mb-6 text-center hero-text">
            <span className="darking opacity-50">A</span> One-Stop Learning Solution{" "}
            <span className="darking opacity-50">about<br /> the </span>
            Laws and Rights <span className="darking opacity-50">that protect you.</span>
          </p>
          <Link
            to="/children"
            className="inline-block px-[2vw] py-[1vw] rounded-lg font-semibold hero-button"
          >
            <div className="hero-button-text text-center">
              Get Started
            </div>
          </Link>
        </div>
      </section>

      {/* Preamble of Indian Constitution */}
      <section className="bg-black">
        <PreambleSection />

        {/* News Section of Page */}
        <img src={line} className="lines mx-auto" alt="divider" />
        <NewsSection />
        <img src={line} className="lines mx-auto mt-12" alt="divider" />
      </section>

      {/* Feature Section */}
      <section>
        <FeaturesSection />
      </section>

      {/* About Us Section */}
      <section className="z-100">
        <AboutUs />
      </section>

      {/* FAQ Section */}
      <section>
        <FAQSection />
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-[2vh]">
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
