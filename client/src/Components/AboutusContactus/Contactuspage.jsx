import React, { useState } from 'react';
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

  const contactMethods = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          {/* ... (Discord icon path) */}
        </svg>
      ),
      title: "Join our Discord",
      desc: "Join our Discord and meet our great team, you can also submit your questions there!",
      link: {
        name: "Join our Discord",
        href: "https://discord.gg/KJRvjfwC",
      },
    },
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* ... (Twitter icon path) */}
        </svg>
      ),
      title: "Follow us on Twitter",
      desc: "Keep up with our updates, you can also ask us questions there",
      link: {
        name: "Send us DMs",
        href: "https://twitter.com",
      },
    },
    // Add more contact methods as needed
  ];

  return (
    <div>
      <section className="bg-white">
        <div className="max-w-screen-md px-4 py-8 mx-auto lg:py-16">
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-center text-gray-900">
            Contact Us
          </h2>
          <p className="mb-8 font-light text-center text-gray-500 lg:mb-16 sm:text-xl">
            Do you have a question? a suggestion? Tell us down there!
          </p>
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                placeholder="Your name"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg shadow-sm bg-gray-50 focus:ring-primary-500 focus:border-primary-500 "
                placeholder="Email@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your message
              </label>
              <textarea
                name="message"
                id="message"
                rows="8"
                className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-50"
                placeholder="Leave a comment..."
                value={formData.message}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 focus:ring-4 focus:outline-none focus:ring-indigo-300"
            >
              Send message
            </button>
          </form>
          {submitMessage && (
            <div className="mt-4 text-green-500">{submitMessage}</div>
          )}
        </div>
      </section>
      {/* ... (unchanged) */}
    </div>
  );
};

export default ContactUsPage;