import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HelpMeUnderstand = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handleQuestionToggle = (index) => {
    setSelectedQuestion(selectedQuestion === index ? null : index);
  };

  const questions = [
    {
      question: "Why do I need to go to school?",
      answer: "School helps you learn important skills, socialize with peers, and prepare for future opportunities."
    },
    {
      question: "What are traffic rules for?",
      answer: "Traffic rules are designed to keep everyone safe on the road and ensure that vehicles and pedestrians follow a predictable pattern."
    },
    {
      question: "Who makes the laws?",
      answer: "Laws are made by lawmakers, such as legislatures and congresses, who represent the people and discuss what rules should be in place."
    }
  ];

  return (
    <section className="bg-[#FFF0C2] p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-[#FFA69E] mb-4">Help Me Understand</h2>
      <div className="space-y-2">
        {questions.map((item, index) => (
          <div key={index} className="p-3 bg-[#FFF7E6] rounded shadow cursor-pointer" onClick={() => handleQuestionToggle(index)}>
            <h3 className="font-medium text-[#333]">{item.question}</h3>
            <AnimatePresence>
              {selectedQuestion === index && (
                <motion.p
                  className="text-sm text-[#555] mt-2"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {item.answer}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HelpMeUnderstand;
