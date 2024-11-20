// src/Chatbot.js
import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './Chatbot.css';

const API_URL = "https://law-aware.onrender.com/api/v1/chat";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const chatboxRef = useRef(null);

  useEffect(() => {
    chatboxRef.current?.scrollTo(0, chatboxRef.current.scrollHeight);
  }, [messages]);

  const formatMessageText = (text) => {
    // Convert **bold** syntax to HTML <strong> tags
    return text.split(/(\*\*.*?\*\*)/g).map((part, index) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong key={index}>{part.slice(2, -2)}</strong>
      ) : (
        part
      )
    );
  };

  const handleChat = async () => {
    if (!userMessage.trim()) return;

    setMessages([...messages, { text: userMessage, type: 'outgoing' }]);
    setUserMessage('');
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: 'Typing...', type: 'incoming', typing: true },
    ]);
    setIsTyping(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userInput: userMessage }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Server Error');

      const responseText = data.response;
      let index = 0;

      const typeWriter = setInterval(() => {
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.typing
              ? { text: responseText.slice(0, index + 1), type: 'incoming', typing: true }
              : msg
          )
        );
        index++;
        if (index === responseText.length) {
          clearInterval(typeWriter);
          setMessages((prevMessages) =>
            prevMessages.map((msg) =>
              msg.typing ? { ...msg, typing: false } : msg
            )
          );
          setIsTyping(false);
        }
      }, 5);
    } catch (error) {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.typing ? { text: `Error: ${error.message}`, type: 'incoming', error: true } : msg
        )
      );
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleChat();
    }
  };

  const toggleChatbot = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="relative">
      <button
        className="chatbot-icon"
        onClick={toggleChatbot}
      >
        <span className="material-symbols-rounded">mode_comment</span>
      </button>

      <CSSTransition
        in={isChatOpen}
        timeout={300}
        classNames="popup"
        unmountOnExit
      >
        <div className="chatbot">
          <header className="flex items-center justify-between p-4 bg-blue-500 text-white rounded-t-lg">
            <h2 className="text-xl font-semibold">Chatbot</h2>
            <button className="text-white hover:text-gray-300" onClick={toggleChatbot}>
              <span className="material-symbols-outlined">close</span>
            </button>
          </header>

          <ul ref={chatboxRef} className="chatbox">
            <TransitionGroup component={null}>
              {messages.map((msg, index) => (
                <CSSTransition key={index} timeout={300} classNames="fade">
                  <li className={`chat p-3 mb-3 rounded-lg shadow-md ${msg.type === 'outgoing' ? 'text-right bg-blue-100' : msg.error ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-700'}`}>
                    <p className="whitespace-pre-wrap">
                      {formatMessageText(msg.text)}
                    </p>
                  </li>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </ul>

          <div className="chat-input">
            <textarea
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message here..."
              rows="1"
              className="flex-1 border border-gray-300 p-3 rounded-lg resize-none focus:outline-none focus:ring focus:border-blue-300"
            />
            <button className="ml-3 p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none transform transition-transform duration-200 hover:scale-105" onClick={handleChat}>
              <span className="material-symbols-rounded">send</span>
            </button>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default Chatbot;
