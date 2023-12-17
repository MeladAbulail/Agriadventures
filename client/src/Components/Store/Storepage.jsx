import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
const StorePage = ({ setCart }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [minRating, setMinRating] = useState('');
  const [maxRating, setMaxRating] = useState('');
  const [sortByRating, setSortByRating] = useState(false);
  const [showAddedToCart, setShowAddedToCart] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:4000/Get_All_Products')
      .then((response) => {
        setProducts(response.data.products);
        setFilteredProducts(response.data.products);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  useEffect(() => {
    const filtered = products
      .filter(
        (product) =>
          product.productName &&
          product.productName.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (selectedCategory === 'all' || product.category === selectedCategory) &&
          (minPrice === '' || parseFloat(product.price) >= parseFloat(minPrice)) &&
          (maxPrice === '' || parseFloat(product.price) <= parseFloat(maxPrice)) &&
          (minRating === '' || parseFloat(product.totalStars) >= parseFloat(minRating)) &&
          (maxRating === '' || parseFloat(product.totalStars) <= parseFloat(maxRating))
      )
      .sort((a, b) => (sortByRating ? b.totalStars - a.totalStars : 0));

    setFilteredProducts(filtered);
  }, [
    searchTerm,
    selectedCategory,
    minPrice,
    maxPrice,
    minRating,
    maxRating,
    sortByRating,
    products,
  ]);

  const categories = [...new Set(products.map((product) => product.category))];

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setMinPrice('');
    setMaxPrice('');
    setMinRating('');
    setMaxRating('');
    setFilteredProducts(products);
    setCurrentPage(1);
  };

  const addToCart = (product) => {
    const token = Cookies.get('token');
    if (product.productId === undefined) {
      console.error('Product ID is undefined. Cannot add item to cart.');
      return;
    }

    const config = {
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
    };

    axios
      .post(
        'http://localhost:4000/Add_To_Cart',
        {
          productId: product.productId,
        },
        config
      )
      .then((response) => {
        if (response.data.success) {
          console.log('Item added to cart:', response.data);
          setCart(response.data.cartItems);
          setShowAddedToCart(true);

          // Automatically hide the pop-up after 3 seconds (adjust as needed)
          setTimeout(() => {
            setShowAddedToCart(false);
          }, 3000);
        } else {
          console.error(
            'Failed to add item to cart. Server response:',
            response.data.message
          );
        }
      })
      .catch((error) => {
        console.error('Error adding item to cart:', error);
      });
  };

  const handleSortChange = () => {
    setSortByRating(!sortByRating);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  return (
    <section>

{showAddedToCart && (
        <div className="fixed top-0 right-0 z-50 p-2 m-4 text-white bg-green-500 rounded">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 stroke-current shrink-0"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="ml-2">Added to cart!</span>
        </div>
      )}



      <div className="flex flex-col mx-4 mt-4 mb-4 lg:flex-row lg:mx-20 lg:mt-32 lg:mb-32">
        <div className="p-4 mb-4 border-2 rounded-lg lg:w-1/4 lg:mb-0">
          <h2 className="mb-4 text-xl font-bold">Filter</h2>
          <label className="block text-sm font-medium text-gray-600">Product Name</label>
          <input
            type="text"
            placeholder="Search by title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />
          <div className="h-[0.5px] my-4 bg-[#d4d4d4]"></div>
          <div>
            <p className="mb-2 font-bold">Filter by Category</p>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 mb-4 text-gray-600 border rounded"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category} className='text-gray-600'>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p className="mb-2 font-bold">Filter by Price Range</p>
            <div className="flex mb-4">
              <input
                type="number"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-1/2 p-2 mr-2 border rounded"
              />
              <input
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-1/2 p-2 border rounded"
              />
            </div>
          </div>

          <div className="flex flex-col mb-4">
            <div className="h-[0.5px] my-4 bg-[#d4d4d4]"></div>
            <div className="flex mb-4">
              <div className="mr-4">
                <label className="block text-sm font-medium text-gray-600">Min Rating</label>
                <input
                  type="number"
                  step="1"
                  name="minRating"
                  placeholder="0"
                  value={minRating}
                  onChange={(e) => setMinRating(e.target.value)}
                  className="block w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Max Rating</label>
                <input
                  type="number"
                  step="1"
                  name="maxRating"
                  placeholder="5"
                  value={maxRating}
                  onChange={(e) => setMaxRating(e.target.value)}
                  className="block w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
            </div>
          </div>

          <button
            onClick={resetFilters}
            className="w-full p-2 mt-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
          >
            Clear Filters
          </button>
        </div>

        <div className="w-full p-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {currentItems.map((product) => (
              <div
                key={product.productId}
                className="w-full max-w-xs mb-4 bg-white border border-gray-200 rounded-lg shadow"
              >
                <img
                  className="object-cover h-40 p-4 rounded-t-lg"
                  src={product.imageUrl}
                  alt={product.productName}
                />
                <div className="px-4 pb-4">
                  <h5 className="text-lg font-semibold tracking-tight text-gray-900">
                    {product.productName}
                  </h5>
                  <p className="text-lg font-bold text-gray-900">${product.price}</p>
                  <div className="flex flex-row items-center justify-between mt-2">
  <div className="flex space-x-2">
    <button
      className="flex items-center justify-center text-white bg-[#87ceeb] hover:bg-[#6ba3cb] focus:ring-4 focus:outline-none focus:ring-87ceeb font-medium rounded-lg text-sm px-3 py-1.5"
      onClick={() => addToCart(product)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4 mr-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      Add to Cart
    </button>
    <Link to={`/ProductDetailsPage/${product.productId}`}>
      <button className="flex items-center justify-center text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-1.5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        View Item
      </button>
    </Link>
  </div>
</div>

                </div>
              </div>
            ))}



          </div>

          <div className="flex justify-center mt-4">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 mr-2 font-bold text-gray-800 bg-gray-300 rounded"
            >
              Previous
            </button>
            {Array.from(
              { length: Math.ceil(filteredProducts.length / itemsPerPage) },
              (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={`px-4 py-2 font-bold text-gray-800 bg-gray-300 rounded mr-2 ${currentPage === index + 1 ? 'bg-gray-500' : ''
                    }`}
                >
                  {index + 1}
                </button>
              )
            )}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === Math.ceil(filteredProducts.length / itemsPerPage)}
              className="px-4 py-2 ml-2 font-bold text-gray-800 bg-gray-300 rounded"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorePage;
