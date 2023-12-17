import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import  ProductRating from './ProductRating'
import DisplayProductComment from './DisplayProductComment'

const ProductDetailsPage = ({ setCart }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/Get_Product_By_Id/${productId}`);
        setProduct(response.data.product); // Assuming that the response is a JSON object with product details
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProduct();
  }, [productId]); // Include id in the dependency array to re-fetch when it changes

  const addToCart = () => {
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

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className='m-32'>
      <div className="flex p-4 px-32 py-20">
        {/* Image Section on the left with adjusted height and width */}
        <div className="w-1/2">
          <img
            src={product.imageUrl} // Replace 'imageUrl' with the actual property name in your data
            alt={product.productName}
            className="object-cover w-1/2" // Adjusted width to 50%, you can modify as needed
          />
        </div>

        {/* Product Details Section on the right */}
        <div className="flex flex-col justify-between w-1/2 p-4">
          <div>
            <h2 className="mb-2 text-2xl font-bold">{product.productName}</h2>
            <p className="mb-2 text-lg">{`Category: ${product.category}`}</p>
            <p className="mb-2 text-lg">{`Price: ${product.price}$`}</p>
            {/* Add more details as needed */}
          </div>

          {/* Purchase Button at the bottom right */}
          <div className="flex justify-end">
            <button
              className="px-4 py-2 text-white bg-blue-500 rounded"
              onClick={addToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Product Description Section under everything else */}
      <div className="p-4">
        <h3 className="mb-2 text-xl font-bold">Product Description</h3>
        <p>{product.description}</p>
      </div>
      <ProductRating
        productId={product.productId}
        productName={product.productName}
      />
      <DisplayProductComment />
    </div>
  );
  
};

export default ProductDetailsPage;
