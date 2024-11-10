import React from "react";
import card1 from "../assets/images/card1.png";
import card2 from "../assets/images/card2.png";
import card3 from "../assets/images/card3.png";
import { Link } from "react-router-dom";


const FeaturesSection = () => {
  return (
    <section className="relative h-screen bg-light-gray z-0 overflow-hidden flex items-center justify-center">
      <div className="text-center px-4 md:px-16"> 
        <h1 className="text-4xl font-bold mb-2 text-dark ">
          Upgrade Your Knowledge.
        </h1>
        <h1 className="text-4xl font-bold mb-8 text-dark">
          Start Today!
        </h1>

        <div className="flex flex-col md:flex-row justify-center gap-32 w-full">
          {/* Card 1 */}
          <div
            className="feature-card bg-cover bg-center rounded-lg shadow-lg h-32 " 
            style={{ backgroundImage: `url(${card1})` }}
          >
            <div className="flex items-center justify-center h-full  bg-opacity-70 rounded-lg text-dark text-3xl font-bold text-white">
              <Link to='/quiz'>
              Quiz
              </Link>
            </div>
          </div>

          {/* Card 2 */}
          <div
            className="feature-card bg-cover bg-center rounded-lg shadow-lg h-32" 
            style={{ backgroundImage: `url(${card2})` }}
          >
            <div className="flex items-center justify-center h-full bg-opacity-70 rounded-lg text-dark text-3xl font-bold text-white">
              <Link to='/learning'>
              Case Study
              </Link>
            </div>
          </div>

          {/* Card 3 */}
          <div
            className="feature-card bg-cover bg-center rounded-lg shadow-lg h-32" 
            style={{ backgroundImage: `url(${card3})` }}
          >
            <div className="flex items-center justify-center h-full bg-opacity-70 rounded-lg text-dark text-3xl font-bold text-white">
              <Link to='/article'>
              Constitution
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
