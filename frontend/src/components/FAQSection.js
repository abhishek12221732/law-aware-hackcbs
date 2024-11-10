import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const faqData = [
  {
    question: "What is the Constitution of India?",
    answer: "The Constitution of India is the supreme law of the land. It lays down the framework defining fundamental political principles, establishes the structure, procedures, and duties of government institutions, and outlines the fundamental rights and duties of citizens.",
  },
  {
    question: "What are Fundamental Rights?",
    answer: "Fundamental Rights are basic human rights guaranteed by the Indian Constitution to all citizens, such as the right to equality, freedom of speech, and protection against discrimination.",
  },
  {
    question: "What is the role of the Supreme Court of India?",
    answer: "The Supreme Court of India is the highest judicial authority. It ensures the protection of the Constitution and the laws of India, acting as the final court of appeal and safeguarding the fundamental rights of citizens.",
  },
  {
    question: "What is the difference between civil and criminal law?",
    answer: "Civil law deals with disputes between individuals or organizations, while criminal law deals with offenses against the state and society, such as theft, assault, and murder.",
  },
  {
    question: "What is PIL (Public Interest Litigation)?",
    answer: "Public Interest Litigation allows individuals or groups to file petitions in court on behalf of the public, often for the enforcement of rights related to social justice, environmental protection, or government accountability.",
  },
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-gradient-to-r from-green-50 via-yellow-100 to-lime-200 text-gray-800 py-12 px-6 lg:px-20 min-h-screen">
      {/* Heading */}
      <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
        FAQs
      </h2>

      {/* FAQ Boxes */}
      <div className="space-y-4 max-w-7xl mx-auto">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg shadow p-4 cursor-pointer transform transition-transform hover:shadow-md"
            onClick={() => toggleFAQ(index)}
            style={{ 
              background: 'linear-gradient(to right, #e4f7d4, #f9f9b0, #d5e0a6)', // yellowish-green gradient
              padding: '1rem 1.5rem',
            }}
          >
            {/* Question */}
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-800 transition-all duration-300 hover:text-green-700">
                {faq.question}
              </h3>
              <button className="text-gray-500">
                {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </button>
            </div>

            {/* Answer with Pop-up Transition */}
            <div
              className={`overflow-hidden transition-all duration-500 transform ${
                activeIndex === index ? 'max-h-96 translate-y-0 opacity-100' : 'max-h-0 -translate-y-10 opacity-0'
              }`}
            >
              <p className="mt-3 text-gray-600">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
