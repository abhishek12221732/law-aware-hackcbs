import React, { useEffect } from "react";
import Swiper, { Navigation } from "swiper/bundle";
import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Slider = () => {
  useEffect(() => {
    const swiper = new Swiper(".mySwiper", {
      slidesPerView: 1,
      spaceBetween: 10,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });

    gsap.registerPlugin(ScrollTrigger);

    // Apply zoom-out effect with scrollTrigger without pinning
    gsap.to(".swiper-container", {
      scale: 0.3,
      scrollTrigger: {
        trigger: ".swiper-container",
        start: "top top",
        end: "400px top",
        scrub: true,
        markers: false, // Disable markers if not needed
      },
      ease: "power1.inOut",
      transformOrigin: "center top",
    });

    return () => {
      swiper.destroy();
    };
  }, []);

  return (
    <div id="swiper" className="relative w-full mx-auto mt-8 swiper-container">
      <div className="swiper mySwiper">
        <div className="swiper-wrapper">
          {/* Slide 1 */}
          <div className="swiper-slide relative">
            <img src="https://wowslider.com/sliders/demo-18/data1/images/hongkong1081704.jpg" alt="Slide 1" className="w-full" />
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white p-2 rounded">
              <h6>Content for Slide 1</h6>
            </div>
          </div>
          {/* Slide 2 */}
          <div className="swiper-slide relative">
            <img src="https://wowslider.com/sliders/demo-18/data1/images/hongkong1081704.jpg" alt="Slide 2" className="w-full" />
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white p-2 rounded">
              <h6>Content for Slide 2</h6>
            </div>
          </div>
          {/* Slide 3 */}
          <div className="swiper-slide relative">
            <img src="https://wowslider.com/sliders/demo-18/data1/images/hongkong1081704.jpg" alt="Slide 3" className="w-full" />
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white p-2 rounded">
              <h6>Content for Slide 3</h6>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute top-1/2 left-4 -translate-y-1/2 swiper-button-prev btns text-2xl text-white cursor-pointer">
        &#10094;
      </div>
      <div className="absolute top-1/2 right-4 -translate-y-1/2 swiper-button-next btns text-2xl text-white cursor-pointer">
        &#10095;
      </div>
    </div>
  );
};

export default Slider;
