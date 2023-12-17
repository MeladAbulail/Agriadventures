import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3;  

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % totalSlides);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); 
    return () => {
      clearInterval(interval);
    };
  }, [currentSlide]);

  return (
    <div className='h-1/2'>
      <Carousel
        showStatus={false}
        showArrows={false}
        selectedItem={currentSlide}
        onChange={setCurrentSlide}
      >
        <div>
          <div className="h-full hero-slide" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1498191923457-88552caeccb3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")' }}>
            <div className="hero-text">
              <h1 id='Res'>Welcome to Agriadventures</h1>
              <p>Discover amazing activities that await you.</p>
              {/* <Link to ="/BookNow">
                <button className="bn632-hover bn28" id="button">Book Now</button>
              </Link> */}
            </div>
          </div>
        </div>
        <div>
          <div className="hero-slide" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")' }}>
            <div className="hero-text">
              <h1 id='Res'>High Quality Products</h1>
              <p>Providing unparalleled value through the sale of premium, high-quality products designed to meet and exceed customer expectations.</p>
              <Link to ="/BookNow">
                <button className="bn632-hover bn28" id="button">Book Now</button>
              </Link>
            </div>
          </div>
        </div>
        <div>
          <div className="hero-slide" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2232&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")' }}>
            <div className="hero-text">
              <h1 id='Res'>Exceptional Customer Experience</h1>
              <p>Dedicated to delivering an exceptional customer experience by providing the finest products, unparalleled quality, and top-notch service.</p>
              {/* <Link to ="/BookNow">
                < button className="bn632-hover bn28" id="button" >Book Now </button>
              </Link> */}
            </div>
           
          </div>
        </div>
      </Carousel>
    </div>
  );
}; {/* <Link to="/Oss" className="block px-4 py-2 mt-4 mr-2 rounded lg:inline-block lg:mt-0 hover:text-white hover:bg-blue-700">Book now</Link> */}


export default Hero;
