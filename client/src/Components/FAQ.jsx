import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FAQ = () => {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/Get_All_FAQ_PAGINATION`);
        setQuestions(response.data.allFAQ);
        console.log(response.data.allFAQ)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };    
    fetchData();
  }, []);
  

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = questions.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="bg-white ">
      <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-16 lg:px-6">
        <h2 className="mb-8 text-4xl font-extrabold tracking-tight text-gray-900 ">Frequently asked questions</h2>
        <div className="grid pt-8 text-left border-t border-gray-200 md:gap-16 md:grid-cols-2">
          <div>
            {currentItems.slice(0, 5).map((item) => (
              <div key={item.id} className="mb-10">
                <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 ">
                  <svg className="flex-shrink-0 w-5 h-5 mr-2 text-gray-500 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
                  </svg>
                  {item.question}
                </h3>
                <p className="text-gray-500 ">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
          <div>
            {currentItems.slice(5, 10).map((item) => (
              <div key={item.id} className="mb-10">
                <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 ">
                  <svg className="flex-shrink-0 w-5 h-5 mr-2 text-gray-500 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
                  </svg>
                  {item.question}
                </h3>
                <p className="text-gray-500 ">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 mb-8">
        {Array.from({ length: Math.ceil(questions.length / itemsPerPage) }, (_, index) => (
          <button key={index} onClick={() => paginate(index + 1)} className="px-3 py-2 mx-1 bg-gray-200 rounded-full">
            {index + 1}
          </button>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
