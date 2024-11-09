import React, { useState, useEffect } from 'react';

const Slider = () => {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('http://api.mediastack.com/v1/news?access_key=2ba4b8052f812722ab86c724993730b3&countries=IN&languages=en&limit=10');
        const data = await response.json();
        const filteredData = data.data.filter(slide => slide.image); // Only include slides with images
        console.log(data);
        setSlides(filteredData);
      } catch (error) {
        console.error('Error fetching news:', error);
        setError('Failed to fetch news data.');
      }
    };
    fetchNews();
  }, []);

  // Navigation handlers
  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const goToPreviousSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  // Fallback if no slides or loading error
  if (slides.length === 0 && !error) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="relative w-screen h-screen overflow-hidden flex justify-center items-center">
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}vw)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-screen h-screen flex flex-col justify-center items-center text-center"
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-3/4 object-cover"
            />
            <h2 className="text-3xl font-bold mt-4">{slide.title}</h2>
            <p className="text-lg mt-2">{slide.description}</p>
            <a href={slide.url} className="text-blue-500 underline mt-4" target="_blank" rel="noopener noreferrer">
              Read More
            </a>
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        onClick={goToPreviousSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
      >
        &lt;
      </button>
      <button
        onClick={goToNextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
      >
        &gt;
      </button>
    </div>
  );
};

export default Slider;
