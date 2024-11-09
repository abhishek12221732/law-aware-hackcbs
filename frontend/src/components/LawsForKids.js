import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const LawsForKids = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); 
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('laws-for-kids');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section
      id="laws-for-kids"
      className="bg-[#FFF0C2] p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-semibold text-[#FFA69E] mb-6">Laws for Kids</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { title: "Anti-Bullying", description: "Everyone has the right to feel safe at school." },
          { title: "School Attendance", description: "School is important for learning and making friends." },
          { title: "Online Safety", description: "Stay safe when you’re using the internet." },
          { title: "Privacy Rights", description: "You have the right to keep your personal information private." },
          { title: "Respect for Others", description: "Everyone deserves respect and kindness." },
          { title: "Freedom of Speech", description: "You can express your thoughts and opinions." },
          { title: "Right to Play", description: "Every child has the right to play and have fun." },
          { title: "Access to Education", description: "You have the right to a quality education." },
          { title: "Health and Safety", description: "You should be safe and healthy at home and school." },
        ].map((item, index) => (
          <motion.div
            key={index}
            className="bg-[#FFF7E6] p-3 rounded-lg shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }} 
            transition={{ delay: index * 0.1 }}
          >
            <h3 className="text-lg font-medium text-[#333]">{item.title}</h3>
            <small className="text-[#555]">{item.description}</small>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default LawsForKids;
