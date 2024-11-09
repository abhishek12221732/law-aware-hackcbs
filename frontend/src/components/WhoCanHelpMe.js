import React from 'react';
import { motion } from 'framer-motion';
import teacherImage from '../assets/images/teacher.jpeg';
import policeImage from '../assets/images/police.jpeg';
import doctorImage from '../assets/images/doctor.jpeg';
import familyImage from '../assets/images/family.jpeg';

const WhoCanHelpMe = () => {
  const cardVariants = {
    initial: { scale: 1, boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" },
    hover: { scale: 1.05, boxShadow: "0px 8px 20px rgba(0,0,0,0.2)" }
  };

  return (
    <section className="bg-[#FFF0C2] p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-[#FFA69E] mb-4">Who Can Help Me?</h2>
      <div className="flex flex-wrap space-x-4">
        {[
          { 
            role: "👩‍🏫 Teacher", 
            description: "A teacher can help you understand your rights at school.",
            image: teacherImage 
          },
          { 
            role: "👮 Police Officer", 
            description: "A police officer can help if you feel unsafe.",
            image: policeImage 
          },
          { 
            role: "👨‍⚕️ Doctor", 
            description: "Doctors keep you healthy and safe.",
            image: doctorImage 
          },
          { 
            role: "👪 Family", 
            description: "A family will support you always whatever the situation is!",
            image: familyImage
          }
        ].map((item, index) => (
          <motion.div 
            key={index} 
            className="bg-[#FFF7E6] p-4 rounded shadow-md w-40 mb-6 cursor-pointer"
            variants={cardVariants}
            initial="initial"
            whileHover="hover"
          >
            <p className="text-lg font-medium">{item.role}</p>
            <small className="text-[#555]">{item.description}</small>
            <img 
              src={item.image} 
              alt={item.role} 
              className="mt-2 rounded border-2 border-[#FFA69E] shadow-md" 
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhoCanHelpMe;
