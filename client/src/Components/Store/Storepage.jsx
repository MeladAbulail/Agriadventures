import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const StorePage = (setCart) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    axios.get('http://localhost:4000/Get_All_Products')
      .then(response => {
        setProducts(response.data.products);
        setFilteredProducts(response.data.products);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.productName && product.productName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'all' || product.category === selectedCategory) &&
      (minPrice === '' || parseFloat(product.price) >= parseFloat(minPrice)) &&
      (maxPrice === '' || parseFloat(product.price) <= parseFloat(maxPrice))
    );
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, minPrice, maxPrice, products]);

  const categories = [...new Set(products.map(product => product.category))];

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setMinPrice('');
    setMaxPrice('');
    setFilteredProducts(products);
  };

  const addToCart = (product) => {
    const token = Cookies.get("token");
  
    // Check if product.id is defined
    if (product.productId === undefined) {
      console.error("Product ID is undefined. Cannot add item to cart.");
      return;
    }
  
    const config = {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    };
  
    axios
      .post(
        "http://localhost:4000/Add_To_Cart",
        {
          productId: product.productId,
        },
        config
      )
      .then((response) => {
        if (response.data.success) {
          console.log("Item added to cart:", response.data);
          // Update the cart state
          setCart(response.data.cartItems);
        } else {
          console.error("Failed to add item to cart. Server response:", response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error adding item to cart:", error);
        // Handle error (e.g., show an error message to the user)
      });
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
              key={product.productId}
              className="w-full max-w-xs bg-white border border-gray-200 rounded-lg shadow"
            >
              <img
                className="object-cover p-4 rounded-t-lg max-h-40 max-w-80"
                src={product.imageUrl}
                alt={product.productName}
              />
              <div className="px-4 pb-4">
                  <h5 className="text-lg font-semibold tracking-tight text-gray-900">
                    {product.productName}
                  </h5>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">
                    $ {product.price}
                  </span>
                  <div className="flex">
                    <Link to={`/ProductDetailsPage/${product.productId}`}>
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
