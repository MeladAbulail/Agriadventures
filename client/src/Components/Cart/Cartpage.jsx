import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [itemRemoved, setItemRemoved] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");

    const config = {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    };

    axios.get('http://localhost:4000/Get_Items_According_UserId', config)
      .then((response) => {
        setCart(response.data.cartItems || []);
        setError(null);
      })
      .catch((error) => {
        console.error('Error fetching cart items:', error);
        setError("Failed to fetch cart items.");
      })
      .finally(() => {
        setItemRemoved(false);
      });
  }, [itemRemoved, cart]);

  const removeFromCart = async (cartId) => {
    try {
      await axios.delete(`http://localhost:4000/Delete_From_Cart/${cartId}`);
      setCart((prevCart) => prevCart.filter((item) => item.cartId !== cartId));
      setItemRemoved(true);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const updateQuantity = async (cartId, newQuantity) => {
    try {
      const response = await axios.put(`http://localhost:4000/Update_From_Cart/${cartId}`, { quantity: newQuantity });
      setCart((prevCart) => {
        const updatedCart = prevCart.map((item) => {
          if (item.cartId === cartId) {
            return { ...item, quantity: response.data.quantity };
          }
          return item;
        });
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        return updatedCart;
      });
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price || 0) * item.quantity, 0);
  };

  const totalPrice = calculateTotal() + 4.99;

  const handleCheckout = () => {
    console.log("Handling checkout...");
    navigate("/Payment", { state: { totalPrice } });
  };

  const handleEmptyCart = async () => {
    const token = Cookies.get("token");
    const config = {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    };

    if (cart.length === 0) {
      console.log("Cart is already empty.");
      return;
    }

    try {
      await axios.delete('http://localhost:4000/Delete_All_By_UserId', config);
      setCart([]);
      localStorage.removeItem('cart');
    } catch (error) {
      console.error('Error deleting cart data from the server:', error);
    } finally {
      updateLocalStorage();
      console.log('Local storage updated');
    }
  };

  const updateLocalStorage = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  return (
    <div className="flex flex-col min-h-screen pb-10 bg-gray-100">
      <h1 className="my-20 mb-10 text-2xl font-bold text-center">Cart Items</h1>
      <div className="flex-grow max-w-5xl px-6 mx-auto md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {cart.map((cartItem) => (
            <div
              key={cartItem.cartId}
              className="justify-between p-6 mb-6 bg-white rounded-lg shadow-md sm:flex sm:justify-start"
            >
              <img
                src={cartItem.imageUrl}
                alt={cartItem.productName}
                className="w-full rounded-lg sm:w-40"
              />
              <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                  <h2 className="text-lg font-bold text-gray-900">
                    {cartItem.productName}
                  </h2>
                  <p className="mt-1 text-xs text-gray-700">{cartItem.size}</p>
                </div>
                <div className="flex justify-between mt-4 sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                  <div className="flex items-center border-gray-100">
                    <span
                      className={`cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 ${cartItem.quantity === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-500 hover:text-blue-50'}`}
                      onClick={() => updateQuantity(cartItem.cartId, cartItem.quantity - 1)}
                      disabled={cartItem.quantity === 1}
                    >
                      -
                    </span>
                    <input
                      className="w-8 h-8 text-xs text-center bg-white border outline-none"
                      type="number"
                      value={cartItem.quantity}
                      min="1"
                      readOnly
                    />
                    <span
                      className="px-3 py-1 duration-100 bg-gray-100 rounded-r cursor-pointer hover:bg-blue-500 hover:text-blue-50"
                      onClick={() => updateQuantity(cartItem.cartId, cartItem.quantity + 1)}
                    >
                      +
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="text-sm">{cartItem.price} $</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-5 h-5 duration-150 cursor-pointer hover:text-red-500"
                      onClick={() => removeFromCart(cartItem.cartId)}
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Subtotal */}
        <div className="sticky h-full p-6 bg-white border rounded-lg shadow-md top-20 md:w-1/3 min-w-[250px]">
          <div className="flex justify-between mb-2">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">{calculateTotal()} $</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700 ">Shipping</p>
            <p className="text-gray-700">$4.99</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total </p>
            <div className="">
              <p className="mb-1 text-lg font-bold">
                {calculateTotal() + 4.99} $
              </p>
              <p className="text-sm text-gray-700">Shipping Included</p>
            </div>
          </div>
          <button
            className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
            onClick={handleCheckout}
          >
            Check Out
          </button>
          <button
            className="mt-6 w-full rounded-md bg-red-500 py-1.5 font-medium text-blue-50 hover:bg-red-600"
            onClick={handleEmptyCart}
          >
            Empty Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
