import React from 'react';
import Video1 from '../assets/videos/rightToEducation.mp4'; 
import Video2 from '../assets/videos/rightToIdentity.mp4';
import Video3 from '../assets/videos/abuse.mp4';

const AnimatedVideos = () => {
  return (
    <section className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-yellow-400 mb-4">Animated Videos</h2>
      <div className="flex flex-col space-y-4">
        {[{ src: Video1, title: "Right to Education" }, { src: Video2, title: "Right to Identity" }, { src: Video3, title: "Understanding Child Abuse" }].map((video, index) => (
          <div key={index} className="w-full">
            <video
              className="w-full rounded shadow-md"
              src={video.src}
              muted
              preload="metadata"
              onMouseEnter={(e) => e.currentTarget.play()}
              onMouseLeave={(e) => e.currentTarget.pause()}
              onClick={(e) => {
                if (e.currentTarget.paused) {
                  e.currentTarget.play();
                } else {
                  e.currentTarget.pause();
                }
              }}
            />
            <h3 className="text-lg font-semibold text-yellow-400 mt-2">{video.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AnimatedVideos;
