import React from 'react';
import { Link } from 'react-router-dom';

function Locations() {
  return (
    <div className="flex flex-row flex-wrap justify-around mx-5 mt-10 mb-10 md:mx-36">
      <Link to="/Category?location=Irbid" className="md:flex-col">
        <figure className="relative w-48 max-w-sm transition-all duration-300 cursor-pointer filter h-1/6">
          <img
            className="rounded-lg"
            src="https://images.unsplash.com/photo-1498191923457-88552caeccb3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Irbid"
          />
          <figcaption className="absolute right-0 px-4 pb-4 mt-10 text-lg text-white top-full left-2">
            <p className="absolute left-0 text-lg text-white top-full">Irbid</p>
          </figcaption>
        </figure>
      </Link>

      <Link to="/Category?location=Zarqa" className="md:flex-col">
        <figure className="relative w-48 max-w-sm transition-all duration-300 cursor-pointer filter h-1/6">
          <img
            className="rounded-lg"
            src="https://images.unsplash.com/photo-1470685983317-0084951ce1ca?q=80&w=1746&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Zarqa"
          />
          <figcaption className="absolute right-0 px-4 pb-4 mt-10 text-lg text-white top-full left-2">
          <p className="absolute left-0 text-lg text-white top-full">Zarqa</p>
          </figcaption>
        </figure>
      </Link>

      <Link to="/Category?location=Ajloun" className="md:flex-col">
        <figure className="relative w-48 max-w-sm transition-all duration-300 cursor-pointer filter h-1/6">
          <img
            className="rounded-lg"
            src="https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Zarqa"
          />
          <figcaption className="absolute right-0 px-4 pb-4 mt-10 text-lg text-white top-full left-2">
          <p className="absolute left-0 text-lg text-white top-full">Ajloun</p>
          </figcaption>
        </figure>
      </Link>

      <figure className="relative w-48 max-w-sm transition-all duration-300 cursor-pointer filter h-1/6 md:flex-col">
        <a href="#">
          <img
            className="rounded-lg"
            src="https://images.unsplash.com/photo-1457530378978-8bac673b8062?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Amman"
          ></img>
        </a>
        <figcaption className="absolute px-4 text-lg text-white bottom-6">
          <p>Amman</p>
        </figcaption>
      </figure>

      <figure className="relative w-48 max-w-sm transition-all duration-300 cursor-pointer filter h-1/6 md:flex-col">
        <a href="#">
          <img
            className="rounded-lg"
            src="https://plus.unsplash.com/premium_photo-1668114375357-7d14199e8fcf?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Aqaba"
          ></img>
        </a>
        <figcaption className="absolute px-4 text-lg text-white bottom-6">
          <p>Aqaba</p>
        </figcaption>
      </figure>

      <figure className="relative w-48 max-w-sm transition-all duration-300 cursor-pointer filter h-1/6 md:flex-col">
        <a href="#">
          <img
            className="rounded-lg"
            src="https://images.unsplash.com/photo-1534073133331-c4b62a557083?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Zarqa"
          ></img>
        </a>
        <figcaption className="absolute px-4 text-lg text-white bottom-6">
          <p>Zarqa</p>
        </figcaption>
      </figure>
    </div>
  );
}

export default Locations;