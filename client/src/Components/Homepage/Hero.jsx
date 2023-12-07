import React, { useState ,useEffect} from "react";
import Heroimage from "./aaaa.jpg";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1498191923457-88552caeccb3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D.png",
      label: "Collection of Activities",
      content: "Exploring diverse outdoor pursuits, from hiking and camping to creative endeavors like painting and music, to cultivate a well-rounded set of skills and experiences..",
    },
    {
      image:
        "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      label: "High Quality Products",
      content: "Providing unparalleled value through the sale of premium, high-quality products designed to meet and exceed customer expectations.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2232&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      label: "Exceptional Customer Experience  ",
      content: "Dedicated to delivering an exceptional customer experience by providing the finest products, unparalleled quality, and top-notch service.",
    },
  ];

  const totalSlides = slides.length;

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
  };


  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 6000); 

    return () => clearInterval(intervalId); 
  }, [currentSlide]);

  return (
    <div>
      <div className="relative overflow-hidden h-[500px]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transform transition-transform ease-in-out duration-500 ${
              index === currentSlide ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute inset-x-[15%] bottom-5 py-5 text-center text-white">
              <h5 className="text-xl">{slide.label}</h5>
              <p>{slide.content}</p>
            </div>
          </div>
        ))}

<button
          className="absolute bottom-0 left-0 top-0 z-10 flex items-center justify-center w-[15%] text-white opacity-50 hover:opacity-90 focus:outline-none"
          onClick={prevSlide}
        >
          <span className="text-4xl">&#9664;</span>
        </button>

        <button
          className="absolute bottom-0 right-0 top-0 z-10 flex items-center justify-center w-[15%] text-white opacity-50 hover:opacity-90 focus:outline-none"
          onClick={nextSlide}
        >
          <span className="text-4xl">&#9654;</span>
        </button>
      </div>
    </div>
  );
};

export default Hero;