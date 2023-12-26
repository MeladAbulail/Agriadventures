import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios';

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    message: '',
  });

  const [submitMessage, setSubmitMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = 'http://localhost:4000/Add_New_Message';
      const response = await axios.post(url, formData);

      setSubmitMessage('Message sent successfully!');
      setFormData({
        username: '',
        email: '',
        message: '',
      });

      console.log('Message sent successfully:', response.data);
    } catch (error) {
      setSubmitMessage('Error sending message. Please try again later.');
      console.error('Error sending message:', error.message);
    }
  };

  return (
    <div className='bg-[#fcf9f3] text-[#224229]'>
      <div className="my-2 ml-4 lg:ml-32">
        <ol class="flex items-center whitespace-nowrap" aria-label="Breadcrumb">
          <li class="inline-flex items-center">
            <Link to="/"><a
              class="flex items-center text-lg	 text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:focus:text-blue-500"
              href="#"
            >
              Home
            </a></Link>
            <svg
              class="flex-shrink-0 mx-2 overflow-visible h-4 w-4 text-gray-400  dark:text-neutral-600"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </li>
          <li class="inline-flex items-center">
          <Link to="/Contactus"><a
              class="flex items-center text-lg	 text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:focus:text-blue-500"
              href="#"
            >
              Contact us
            </a></Link>
          </li>
        </ol>
      </div>

      <div className="relative w-full mx-auto my-20 text-gray-700 bg-white max-w-7xl">
        <div className="grid grid-cols-2">
          {/* :MAP CONTAINER */}
          <div className="order-1 col-span-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3381.389589588577!2d36.0826197750916!3d32.05870992034876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151b65cd4d8f17e1%3A0x30e86b8a97e4ac7d!2sOrange%20Digital%20Village%20Zarqa!5e0!3m2!1sen!2sjo!4v1701850319796!5m2!1sen!2sjo"
              width="100%"
              height="300px"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* :CONTACT FORM CONTAINER */}
          <div className="order-3 px-6 py-5 md:order-2 col-span-full md:col-span-1 md:py-10">
            <form
              action=""
              className="max-w-xl mx-auto space-y-4"
              onSubmit={handleSubmit}
            >
              {/* ::Name Input */}
              <div>
                {/* :::label */}
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                {/* :::input */}
                <input
                  
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Name"
                  onChange={handleInputChange}
                  value={formData.username}
                  className="block w-full p-2 text-base placeholder-gray-300 bg-gray-100 border-gray-300 rounded shadow-sm form-input focus:border-green-400 focus:ring-1 focus:ring-green-400"
                />
              </div>
              {/* ::Email Input */}
              <div>
                {/* :::label */}
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                {/* :::input */}
                <input
                  
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email Address"
                  onChange={handleInputChange}
                  value={formData.email}
                  className="block w-full p-2 text-base placeholder-gray-300 bg-gray-100 border-gray-300 rounded shadow-sm form-input focus:border-green-400 focus:ring-1 focus:ring-green-400"
                />
              </div>
              {/* ::Message Input */}
              <div className="col-span-full">
                {/* :::label */}
                <label htmlFor="message" className="sr-only">
                  Message
                </label>
                {/* :::input */}
                <textarea
                onChange={handleInputChange}
                value={formData.message}
                  name="message"
                  id="message"
                  cols="30"
                  rows="6"
                  placeholder="How can we help?"
                  className="w-full p-2 placeholder-gray-300 bg-gray-100 border-gray-300 rounded shadow-sm resize-none form-textarea focus:border-green-400 focus:ring-green-400"
                ></textarea>
              </div>
              {/* ::Submit Button */}
              <div>
                <button
                  type="submit"
                  className="px-6 py-2 text-base font-semibold text-white uppercase bg-green-400 rounded hover:bg-green-500"
                >
                  Send Message
                </button>
              </div>
              {submitMessage && (
            <div className="mt-4 text-green-500">{submitMessage}</div>
          )}
            </form>
          </div>

          {/* :CONTACT INFOS CONTAINER */}
          <div className="order-2 px-6 py-5 md:order-3 col-span-full md:col-span-1 md:py-10">
            <div className="flex flex-col max-w-xl mx-auto space-y-5">
              {/* ::Title Contact Us */}
              <h2 className="text-4xl uppercase font-oswald">Contact us</h2>
              {/* ::Text */}
              <p className="text-sm text-gray-500">
                Get in touch with us today. We are here to assist you with any
                inquiries or concerns you may have. Our team is dedicated to
                providing excellent service and ensuring your satisfaction. Feel
                free to reach out, and let us know how we can help you.
              </p>
              {/* ::Email contact */}
              <a
                href="melad.k.abulail@gmail.com"
                className="inline-flex items-center text-sm font-semibold text-blue-400 hover:text-blue-500"
              >
                Melad.k.abulail@gmail.com
              </a>
              {/* ::Address */}
              <p className="text-sm leading-6 text-gray-500">
                Al Hadiqa, 335P+F47, Zarqa <br /> Zarqa <br /> Jordan
              </p>
              {/* ::Socials */}
              <div className="flex items-center">
                {/* :Twitter */}
                <a
                  href="https://twitter.com/home"
                  className="m-1.5 w-8 h-8 inline-flex justify-center items-center shadow-sm rounded-full bg-[#1DA1F2] text-white filter hover:brightness-125"
                  style={{ backgroundColor: "#1DA1F2" }}
                >
                  {/* ::twitter svg */}
                  <svg
                    className="w-4 h-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                {/* :FACEBOOK */}
                <a
                  href="https://www.facebook.com/"
                  className="m-1.5 w-8 h-8 inline-flex justify-center items-center shadow-sm rounded-full bg-[#4267B2] text-white filter hover:brightness-125"
                  style={{ backgroundColor: "#4267B2" }}
                >
                  {/* ::facebook svg */}
                  <svg
                    className="w-5 h-5 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16.403,9H14V7c0-1.032,0.084-1.682,1.563-1.682h0.868c0.552,0,1-0.448,1-1V3.064c0-0.523-0.401-0.97-0.923-1.005C15.904,2.018,15.299,1.999,14.693,2C11.98,2,10,3.657,10,6.699V9H8c-0.552,0-1,0.448-1,1v2c0,0.552,0.448,1,1,1l2-0.001V21c0,0.552,0.448,1,1,1h2c0.552,0,1-0.448,1-1v-8.003l2.174-0.001c0.508,0,0.935-0.381,0.993-0.886l0.229-1.996C17.465,9.521,17.001,9,16.403,9z" />
                  </svg>
                </a>
                {/* :Instagram */}
                <a
                  href="https://www.instagram.com/"
                  className="m-1.5 w-8 h-8 inline-flex justify-center items-center shadow-sm rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white filter hover:brightness-125"
                >
                  {/* ::instagram svg */}
                  <svg
                    className="w-4 h-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUsPage