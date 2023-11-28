// Install axios for making API requests: npm install axios
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const StorePage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minRating, setMinRating] = useState('');
  const [maxRating, setMaxRating] = useState('');

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'all' || product.category === selectedCategory) &&
      (minPrice === '' || parseFloat(product.price) >= parseFloat(minPrice)) &&
      (maxPrice === '' || parseFloat(product.price) <= parseFloat(maxPrice)) &&
      (minRating === '' || parseFloat(product.rating.rate) >= parseFloat(minRating)) &&
      (maxRating === '' || parseFloat(product.rating.rate) <= parseFloat(maxRating))
    );
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, minPrice, maxPrice, minRating, maxRating, products]);

  const categories = [...new Set(products.map(product => product.category))];

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setMinPrice('');
    setMaxPrice('');
    setMinRating('');
    setMaxRating('');
    setFilteredProducts(products);
  };
  
  const addToCart = (product) => {
    // Send a POST request to add the item to the cart on the server
    axios.post('http://localhost:5000/cart', {
      productId: product.id,
      name: product.title,
      price: product.price,
      quantity: 1, // You can set the quantity to 1 initially
      image: product.image,
    })
    .then(response => {
      console.log('Item added to cart:', response.data);
    })
    .catch(error => console.error('Error adding item to cart:', error));
  };

  return (
    <div className="flex mx-20 mt-32 mb-32">
      <div className="w-1/4 p-4">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <div>
          <p className="mb-2 font-bold">Filter by Category</p>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
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
        <div>
          <p className="mb-2 font-bold">Filter by Rating Range</p>
          <div className="flex mb-4">
            <input
              type="number"
              placeholder="Min Rating"
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
              className="w-1/2 p-2 mr-2 border rounded"
              min="0"
              max="5"
              step="0.1"
            />
            <input
              type="number"
              placeholder="Max Rating"
              value={maxRating}
              onChange={(e) => setMaxRating(e.target.value)}
              className="w-1/2 p-2 border rounded"
              min="0"
              max="5"
              step="0.1"
            />
          </div>
        </div>
        <button
          onClick={resetFilters}
          className="px-4 py-2 font-bold text-gray-800 bg-gray-300 rounded hover:bg-gray-400"
        >
          Reset Filters
        </button>
      </div>

      <div className="w-3/4 p-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="w-full max-w-xs bg-white border border-gray-200 rounded-lg shadow"
            >
              <a href="#">
                <img
                  className="object-cover p-4 rounded-t-lg max-h-40"
                  src={product.image}
                  alt={product.title}
                />
              </a>
              <div className="px-4 pb-4">
                <Link to={`/ProductDetails/${product.id}`}>
                  <h5 className="text-lg font-semibold tracking-tight text-gray-900">
                    {product.title}
                  </h5>
                </Link>
                <div className="flex items-center mt-1 mb-3">
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-3 h-3 ${
                          star <= product.rating.rate
                            ? "text-yellow-300"
                            : "text-gray-200"
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    ))}
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded ms-2">
                    {product.rating.rate}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">
                    ${product.price}
                  </span>
                  <div className="flex">
                    <Link to={`/ProductDetailsPage/${product.id}`}>
                      <button className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center mr-2">
                        View Item
                      </button>
                    </Link>
                    <button
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StorePage;
