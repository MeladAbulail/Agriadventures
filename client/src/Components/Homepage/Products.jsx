import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function PackageEvents() {
  const containerRef = useRef(null);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/Get_All_Products_For_Home_Page');
        const { products: responseDataProducts } = response.data;

        if (Array.isArray(responseDataProducts) && responseDataProducts.length > 0) {
          setProducts(responseDataProducts);
        } else {
          console.error('No data or invalid data structure:', responseDataProducts);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleStart = (e) => {
    const touch = e.touches ? e.touches[0] : e;
    setStartX(touch.pageX - containerRef.current.offsetLeft);
    setStartY(touch.pageY - containerRef.current.offsetTop);

    setScrollLeft(containerRef.current.scrollLeft);
    setScrollTop(containerRef.current.scrollTop);
    setDragging(true);
  };

  const handleMove = (e) => {


    if (!dragging) return;

    const touch = e.touches ? e.touches[0] : e;
    const x = touch.pageX - containerRef.current.offsetLeft;
    const y = touch.pageY - containerRef.current.offsetTop;

    const walkX = (x - startX) * 0.6;
    const walkY = (y - startY) * 0.6;

    containerRef.current.scrollLeft = scrollLeft - walkX;
    containerRef.current.scrollTop = scrollTop - walkY;
  };

  const handleEnd = () => {
    if (dragging) {
      const dragDistance = Math.max(Math.abs(startX - containerRef.current.scrollLeft), Math.abs(startY - containerRef.current.scrollTop));

      if (dragDistance <= 1 && products && products.length > 0) {
        const firstProductId = products[0].productId;
        navigate(`/ProductDetailsPage/${firstProductId}`);
      }
    }

    setDragging(false);
  };

  const handleLeave = () => {
    if (!dragging) {
      setStartX(0);
      setStartY(0);
    }
  };


  return (
    <div className="relative flex flex-col mx-0 mt-5 md:mx-40">
      <div className="mb-4">
        <h1 className="mb-4 text-4xl font-bold md:text-6xl">Products</h1>
      </div>

      <div
        ref={containerRef}
        className="relative flex overflow-x-auto overflow-y-hidden scrolling-touch"
        style={{ cursor: 'grab', width: '100%', touchAction: 'pan-y' }}
        onMouseDown={(e) => handleStart(e)}
        onTouchStart={(e) => handleStart(e)}
        onMouseMove={(e) => handleMove(e)}
        onTouchMove={(e) => handleMove(e)}
        onMouseUp={() => handleEnd()}
        onTouchEnd={() => handleEnd()}
        onMouseLeave={() => handleLeave()}
        onTouchCancel={() => handleLeave()}
      >
        {products && products.length > 0 ? (
          products.slice(0, 8).map((product) => (
            <Link
              key={product.productId}
              to={`/ProductDetailsPage/${product.productId}`}
              draggable="false"
              style={{ textDecoration: 'none' }}
            >
              <article
                className="relative flex flex-col justify-between flex-shrink-0 w-64 px-4 mx-2 overflow-hidden h-fit md:px-8 md:mx-4 md:w-96"
                draggable="false"
              >
                <img
                  src={product.imageUrl}
                  alt={`Image ${product.productName}`}
                  className="object-cover w-full h-[350px]"
                  draggable="false"
                />
                <div className="bg-gradient-to-t from-gray-900 via-gray-900/40 h-1/5"></div>
                <div className="flex flex-row justify-between h-full p-4 text-[#224229]">
                  <h3 className="text-xs font-bold md:text-2xl">{product.productName}</h3>
                  <div className="flex items-end justify-between">
                    <p className="text-xs">{product.locationName}</p>
                    <Link
                      to={`/ProductDetailsPage/${product.productId}`}
                      className="text-md text-[#fcf9f3] hover:underline bg-[#224229] px-4 py-1 rounded-full"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </article>
            </Link>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>

      <div className="mt-5 mb-10 ml-auto">
        
        <div className="flex items-center">
        <Link to='./Store'><img
            className="w-6 h-6 grayscale "
            draggable="false"
            src="https://img.icons8.com/flat-round/000000/arrow-right"
            alt="arrow-right"/></Link>
            
          <Link to='./Store'><p className="ml-2 text-lg md:text-xl hover:underline text-[#224229]">Explore all Products</p></Link>
        </div>
      </div>
    </div>
  );
}

export default PackageEvents;