import { Card } from "@material-tailwind/react";
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import Cookies from "js-cookie";
import { useLocation } from 'react-router-dom';
const stripePromise = loadStripe(
  "pk_test_51OE665Lli6Tt6WiLM2uY97nhsLAwQTLz1ErtmmMkltIkF0Sc5YyMEekoEhA28KkkIfz5rpVuFxAqMsK90InMU3CO00Z2N8q7Ag"
);

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [userEmail, setUserEmail] = useState("");
  const [cardholder, setCardholder] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const totalPrice = location.state.totalPrice;

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const handlePay = async (event) => {
    event.preventDefault();
    setLoading(true);
  
    if (!stripe || !elements) {
      return;
    }
  
    try {
      const cardElement = elements.getElement(CardElement);
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          name: cardholder,
          email: userEmail.toLowerCase(),
        },
      });
  
      if (error) {
        showAlert(error.message, "error");
        return;
      }
  
      const token = Cookies.get("token");
      const config = {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      };
  
      const response = await axios.post(`http://localhost:4000/charge`, {
        paymentMethodId: paymentMethod.id,
        email: userEmail.toLowerCase(),
        phone: userPhone,
        cardholder: cardholder,
        country: country,
        state: state,
        address: address,
        totalPrice: totalPrice,
      }, config);
  
      showAlert("Payment successful!", "success");
  
      // Redirect to the home page after showing the success alert
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
  
    } catch (error) {
      showAlert("An error occurred. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const showAlert = (message, icon) => {
    alert(message, icon);
  };

  return (
    <>
      {true ? (
        <Card className="w-8/12 px-8 py-6 mx-auto my-10 bg-white rounded-md shadow-lg">
          <h1 className="mb-4 text-2xl font-bold">Payment Details</h1>
          <form onSubmit={handlePay} className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                placeholder="your.email@gmail.com"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                value={userPhone}
                onChange={(e) => setUserPhone(e.target.value)}
                placeholder="Enter phone number"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="country" className="block text-sm font-medium">
                Country
              </label>
              <input
                type="text"
                id="country"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                value={country}
                onChange={handleCountryChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="state" className="block text-sm font-medium">
                State
              </label>
              <input
                type="text"
                id="state"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                value={state}
                onChange={handleStateChange}
              />
            </div>
            <div className="col-span-2 mb-4">
              <label htmlFor="address" className="block text-sm font-medium">
                Address Line
              </label>
              <input
                type="text"
                id="address"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                value={address}
                onChange={handleAddressChange}
              />
            </div>
            <div className="col-span-2 mb-4">
              <label htmlFor="card-holder" className="block text-sm font-medium">
                Card Holder
              </label>
              <input
                type="text"
                id="card-holder"
                name="card-holder"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Your full name here"
                value={cardholder}
                onChange={(e) => setCardholder(e.target.value)}
                required
              />
            </div>
            <div className="col-span-2 mb-4">
              <label htmlFor="card-details" className="block text-sm font-medium">
                Card Details
              </label>
              <div>
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#424770",
                        "::placeholder": {
                          color: "#aab7c4",
                        },
                      },
                      invalid: {
                        color: "#9e2146",
                      },
                    },
                  }}
                />
              </div>
            </div>
            <div className="col-span-2 mb-4">
              {loading ? (
                <button
                  disabled=""
                  type="button"
                  className="w-full px-6 py-3 font-medium text-white bg-gray-900 rounded-md"
                >
                  Loading...
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full px-6 py-3 font-medium text-white bg-gray-900 rounded-md"
                >
                  Place Order
                </button>
              )}
            </div>
          </form>
        </Card>
      ) : (
        <Card className="my-10 w-8/12 h-[50vh] mx-auto bg-gray-50 px-4 pt-8 lg:mt-5">
          <p className="text-center">No Products in your Cart</p>
        </Card>
      )}
    </>
  );
};

const Payment = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default Payment;
