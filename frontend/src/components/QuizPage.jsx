import React, { useState, useEffect } from 'react';
import questionsData from '../constants/questions.json';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpring, animated } from 'react-spring';

const QuizPage = () => {
  const [category, setCategory] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showScorePage, setShowScorePage] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  const categories = Object.keys(questionsData);
  const categorizedQuestions = category ? questionsData[category] : [];

  useEffect(() => {
    if (!category || showScorePage) return;

    if (timeLeft <= 0) {
      handleAnswerSelect(null);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, category, showScorePage]);

  const handleAnswerSelect = (answer) => {
    if (selectedAnswer === null) {
      const currentQuestion = categorizedQuestions[currentIndex];
      if (answer === currentQuestion.answer) {
        setScore(score + 1);
        setIsCorrect(true);
      } else {
        setScore(score - 0.25);
        setIsCorrect(false);
      }
      setSelectedAnswer(answer);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < categorizedQuestions.length) {
      setCurrentIndex(currentIndex + 1);
      resetQuestion();
    } else {
      setShowScorePage(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      resetQuestion();
    }
  };

  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory);
    resetQuiz();
  };

  const resetQuestion = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setTimeLeft(60);
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setTimeLeft(60);
    setShowScorePage(false);
  };

  const goToCategories = () => {
    resetQuiz();
    setCategory(null);
  };

  const currentQuestion = categorizedQuestions[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 text-gray-800 flex items-center justify-center mt-16">
  <div className="w-full max-w-3xl p-6 bg-white shadow-lg rounded-lg">
    <h1 className="text-4xl font-extrabold mb-4 text-center text-blue-700">Quiz</h1>

    {!category ? (
      <animated.div className="space-y-8">
        <h2 className="text-3xl font-semibold mb-8 text-center">Choose a Category</h2>
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ${
            categories.length % 3 !== 0 ? 'justify-center' : ''
          }`}
        >
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleCategorySelect(cat)}
              className="cursor-pointer p-6 bg-blue-200 rounded-xl shadow-md flex items-center justify-center text-center text-lg font-bold text-blue-900 hover:bg-blue-300 transition-all duration-200 ease-in-out"
            >
                  {cat.replace(/_/g, ' ')}
                </motion.div>
              ))}
            </div>
          </animated.div>
        ) : showScorePage ? (
          <animated.div className="space-y-6 text-center">
            <h2 className="text-3xl font-semibold mb-4">Quiz Completed!</h2>
            <p className="text-xl font-semibold mb-2">Your Score: {score.toFixed(2)}</p>
            <div className="flex justify-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetQuiz}
                className="px-6 py-3 rounded-lg bg-blue-500 text-white font-bold"
              >
                Restart Quiz
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={goToCategories}
                className="px-6 py-3 rounded-lg bg-green-500 text-white font-bold"
              >
                Go to Categories
              </motion.button>
            </div>
          </animated.div>
        ) : (
          <AnimatePresence>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="mb-4 text-center">
                <p className="text-lg mb-2">Category: {category.replace(/_/g, ' ')}</p>
                <p className="text-lg mb-2">Question {currentIndex + 1} of {categorizedQuestions.length}</p>
                <p className="text-xl font-semibold mb-4">{currentQuestion.question}</p>
                <p className="text-lg mb-4 text-red-500">Time Left: {timeLeft}s</p>
              </div>
              <ul className="space-y-2">
                {currentQuestion.options.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: selectedAnswer === null ? 1.05 : 1 }}
                    whileTap={{ scale: selectedAnswer === null ? 0.95 : 1 }}
                    onClick={() => handleAnswerSelect(option.charAt(0))}
                    disabled={selectedAnswer !== null}
                    className={`w-full py-4 px-6 rounded-xl border-2 transition-all ease-in-out duration-200 text-gray-800 font-medium text-left ${
                      selectedAnswer === option.charAt(0)
                        ? isCorrect
                          ? 'bg-green-200 border-green-400'
                          : 'bg-red-200 border-red-400'
                        : currentQuestion.answer === option.charAt(0) && selectedAnswer !== null
                        ? 'bg-green-200 border-green-400'
                        : 'bg-gray-100'
                    }`}
                  >
                    {option}
                  </motion.button>
                ))}
              </ul>
              <div className="flex justify-between mt-6">
                <motion.button
                  whileHover={{ scale: currentIndex > 0 ? 1.05 : 1 }}
                  whileTap={{ scale: currentIndex > 0 ? 0.95 : 1 }}
                  onClick={handlePreviousQuestion}
                  className={`px-6 py-3 rounded-lg bg-gray-300 ${
                    currentIndex > 0 ? 'text-gray-800' : 'text-gray-500'
                  } font-semibold`}
                  disabled={currentIndex === 0}
                >
                  Previous
                </motion.button>
                <p className="text-lg font-semibold">Score: {score.toFixed(2)}</p>
                <motion.button
                  whileHover={{ scale: currentIndex + 1 < categorizedQuestions.length ? 1.05 : 1 }}
                  whileTap={{ scale: currentIndex + 1 < categorizedQuestions.length ? 0.95 : 1 }}
                  onClick={handleNextQuestion}
                  className={`px-6 py-3 rounded-lg ${
                    currentIndex + 1 < categorizedQuestions.length ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white'
                  } font-semibold`}
                  disabled={selectedAnswer === null}
                >
                  {currentIndex + 1 < categorizedQuestions.length ? 'Next' : 'Finish'}
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
