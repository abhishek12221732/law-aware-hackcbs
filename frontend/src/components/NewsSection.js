import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsSection = () => {
  const [news, setNews] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      // const response = await axios.get(
      //   `http://api.mediastack.com/v1/news?access_key=2ba4b8052f812722ab86c724993730b3&countries=in&languages=en`
      // );
      // const filteredNews = response.data.data.filter((article) => article.image); // Filters for articles with images
      const placeholderData = [
        {
          title: "Placeholder News Title 1",
          description: "This is a short description for placeholder news 1.",
          image: "https://via.placeholder.com/800x400",
          url: "#"
        },
        {
          title: "Placeholder News Title 2",
          description: "This is a short description for placeholder news 2.",
          image: "https://via.placeholder.com/800x400",
          url: "#"
        },
        {
          title: "Placeholder News Title 3",
          description: "This is a short description for placeholder news 3.",
          image: "https://via.placeholder.com/800x400",
          url: "#"
        },
        {
          title: "Placeholder News Title 4",
          description: "This is a short description for placeholder news 4.",
          image: "https://via.placeholder.com/800x400",
          url: "#"
        },
        {
          title: "Placeholder News Title 5",
          description: "This is a short description for placeholder news 5.",
          image: "https://via.placeholder.com/800x400",
          url: "#"
        }
      ];
      setNews(placeholderData);

      // setNews(filteredNews);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % news.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? news.length - 1 : prevSlide - 1));
  };

  return (
    <div className="relative w-70vh  mx-auto overflow-hidden"> {/* Increased max-width */}
      {news.length > 0 && (
        <div className="flex justify-center items-center relative">
          <button
            onClick={prevSlide}
            className="absolute left-0 bg-white text-black p-3 rounded-full hover:bg-gray-300 z-10 ml-6"
          >
            &#10094;
          </button>
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${(currentSlide * 100) / 3}%)`,  // Adjusted for horizontal scroll
              width: `${news.length * 33.3333}%`,  // Adjusted to allow for more slides
            }}
          >
            {news.map((article, index) => (
              <div
                key={index}
                className={`w-1/3 flex-shrink-0 transform transition duration-500 ${
                  index === currentSlide ? "scale-100 opacity-100" : "scale-90 opacity-50"
                }`}
                style={{
                  margin: '0 15px',  // Increased margin between slides
                  transition: "transform 0.5s ease, opacity 0.5s ease"
                }}
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-64 object-cover rounded-lg shadow-lg"  // Height adjusted for landscape orientation
                />
                <div className="absolute inset-0 bg-black opacity-40 rounded-lg" />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-6 text-center">
                  <h2 className="text-2xl font-bold">{article.title}</h2>  {/* Increased font size */}
                  <p className="mt-3 text-base">{article.description}</p>  {/* Increased font size */}
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
                  >
                    Read More
                  </a>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={nextSlide}
            className="absolute right-0 bg-white text-black p-3 rounded-full hover:bg-gray-300 z-10 mr-4"
          >
            &#10095;
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsSection;