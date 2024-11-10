  import React, { useState, useEffect } from 'react';
  import { motion, AnimatePresence } from 'framer-motion';
  import PDFViewer from '../components/PdfViewer';

  const awarenessCards = [
    { id: 1, title: "Right to Education", content: `Right of children to free and compulsory education till completion of elementary education in a neighbourhood school. It clarifies that ‘compulsory education’ means obligation of the appropriate government to provide free elementary education and ensure compulsory admission, attendance and completion of elementary education to every child in the six to fourteen age group. ‘Free’ means that no child shall be liable to pay any kind of fee or charges or expenses which may prevent him or her from pursuing and completing elementary education. It makes provisions for a non-admitted child to be admitted to an age appropriate class.` },
    { id: 2, title: "Protection of Children from Harm", content: `Article 39 of the Constitution directs the state to protect children from being abused or forced into jobs that harm their health and development. This means children should be kept safe from exploitation or dangerous work. Protecting India’s children from violence, abuse and exploitation India has a wide range of laws to protect children and child protection is increasingly accepted as a core component of social development. The challenge is in implementing the laws due to inadequate human resource capacity on the ground and quality prevention and rehabilitation services. As a result, millions of children are prone to violence, abuse and exploitation.` },
    { id: 3, title: "Right to Equality", content: `Under Article 14, everyone in India, including children, has the right to be treated equally. This means no one should be discriminated against based on their caste, religion, gender, or economic background.` },
    { id: 4, title: "Freedom to Express", content: `Article 19 provides all Indian citizens, including children, the right to freedom of speech and expression, but with certain reasonable restrictions. This means children can express themselves freely, but they should be respectful and responsible. In a landmark judgment of the case Maneka Gandhi v. Union of India,[6] the Supreme Court held that the freedom of speech and expression has no geographical limitation and it carries with it the right of a citizen to gather information and to exchange thought with others not only in India but abroad also.` },
    { id: 5, title: "Your Rights During a Trial", content: "During a trial, you have several important rights, including the right to a speedy and public trial, the right to an impartial jury, the right to confront witnesses, and the right against self-incrimination. Understanding these rights is crucial for ensuring a fair legal process." }
  ];

  const AwarenessPage = () => {
    const [activeCard, setActiveCard] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState('');
    const [responses, setResponses] = useState({});

    const handleBarClick = (cardId) => {
      setActiveCard(activeCard === cardId ? null : cardId);
    };

    const handleQuestionSubmit = (e) => {
      e.preventDefault();
      if (newQuestion.trim()) {
        setQuestions([...questions, { id: questions.length + 1, text: newQuestion, answers: [] }]);
        setNewQuestion('');
      }
    };

    const handleResponseSubmit = (questionId, response) => {
      setResponses((prev) => ({
        ...prev,
        [questionId]: [...(prev[questionId] || []), response],
      }));
    };

    return (
      <div className="relative min-h-screen bg-lightBackground text-black font-sans mt-4">
        {/* Main Content */}
        <div className="flex pt-4">
          {/* Awareness Cards Area */}
          <div className="w-3/4 p-8">
            <AnimatePresence mode="wait">
              {activeCard && (
                <motion.div
                  key={activeCard}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5 }}
                  className="p-6 bg-cardBackground rounded-lg shadow-lg m-4"
                >
                  <h3 className="text-2xl font-semibold mb-4 text-primary">
                    {awarenessCards.find(card => card.id === activeCard)?.title}
                  </h3>
                  <p className="text-lg leading-relaxed">
                    {awarenessCards.find(card => card.id === activeCard)?.content}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Two PDF Viewers Side by Side */}
            <div className="flex gap-4">
              <div className="w-1/2">
                <PDFViewer />
              </div>
              <div className="w-1/2">
                <PDFViewer />
              </div>
            </div>

            {/* Forum Section */}
            <div className="mt-8">
              <form onSubmit={handleQuestionSubmit} className="mb-4">
                <textarea
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="Ask a law-related question..."
                  className="w-full p-2 rounded-md text-black"
                  rows="4"
                  required
                />
                <button type="submit" className="mt-2 p-2 bg-primary text-black rounded-md">
                  Submit Question
                </button>
              </form>

              {questions.map((question) => (
                <div key={question.id} className="border p-4 mb-4 bg-cardBackground rounded-lg">
                  <h4 className="font-bold">{question.text}</h4>
                  <div className="mt-2">
                    <h5 className="font-semibold">Responses:</h5>
                    {responses[question.id]?.map((response, index) => (
                      <div key={index} className="pl-4">{response}</div>
                    ))}
                  </div>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const responseInput = e.target.elements.response.value;
                    if (responseInput) {
                      handleResponseSubmit(question.id, responseInput);
                      e.target.reset();
                    }
                  }}>
                    <input 
                      type="text" 
                      name="response" 
                      placeholder="Type your response..." 
                      className="w-full p-2 mt-2 text-black rounded-md"
                      required
                    />
                    <button type="submit" className="mt-2 p-2 bg-primary text-black rounded-md">
                      Submit Response
                    </button>
                  </form>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-1/4 mt-8 bg-white shadow-lg">
            {awarenessCards.map((card) => (
              <motion.div
                key={card.id}
                className={`p-4 m-2 cursor-pointer transition-all duration-300 rounded-lg ${
                  activeCard === card.id 
                    ? 'bg-primary text-black shadow-lg' 
                    : 'bg-cardBackground hover:bg-hoverBackground hover:shadow-md'
                }`}
                onClick={() => handleBarClick(card.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <h4 className="text-lg font-medium">{card.title}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  export default AwarenessPage;
