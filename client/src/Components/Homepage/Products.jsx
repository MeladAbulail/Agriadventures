import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function PackageEvents() {
  const containerRef = useRef(null);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/Get_All_Products');
        console.log('API Response:', response.data.products);

        if (Array.isArray(response.data.products) && response.data.products.length > 0) {
          setProducts(response.data.products);
        } else {
          console.error('No data or invalid data structure:', response.data.products);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleMouseDown = (e) => {
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!startX) return;
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 0.6;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setStartX(0);
  };

  const handleMouseLeave = () => {
    setStartX(0);
  };

  return (
    <div className="flex flex-col mx-0 mt-5 md:mx-40">
      <div className="mb-4">
        <h1 className="mb-4 text-4xl font-bold md:text-6xl">Products</h1>
      </div>

      <div
        ref={containerRef}
        className="flex overflow-x-hidden scrolling-touch"
        style={{ cursor: 'grab', width: '100%' }}
        onMouseDown={(e) => handleMouseDown(e)}
        onMouseMove={(e) => handleMouseMove(e)}
        onMouseUp={() => handleMouseUp()}
        onMouseLeave={() => handleMouseLeave()}
      >
        {products.length > 0 ? (
          products.map((product) => (
            <Link
              key={product.productId}
              to={`/ProductDetailsPage/${product.productId}`}
              draggable="false"
              style={{ textDecoration: 'none' }}
            >
              <article
                className="relative flex flex-col justify-end flex-shrink-0 w-64 h-64 px-4 pt-24 pb-4 mx-2 overflow-hidden md:px-8 md:mx-4 rounded-2xl md:w-96"
                draggable="false"
              >
                <img
                  src={product.imageUrl}
                  alt={`Image ${product.productName}`}
                  className="absolute inset-0 object-cover w-full h-full"
                  draggable="false"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                <h3 className="z-10 mt-2 text-xl font-bold text-white md:text-3xl">
                  {product.productName}
                </h3>
              </article>
            </Link>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>

      <div className="mt-5 mb-10 ml-auto">
        <div className="flex items-center">
          <Link to='./Store'>
            <img
              className="w-6 h-6 grayscale"
              draggable="false"
              src="https://img.icons8.com/flat-round/000000/arrow-right"
              alt="arrow-right"
            />
          </Link>
          <Link to='./Store'>
            <p className="ml-2 text-lg md:text-xl">Explore all Products</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PackageEvents;