import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FAQ = () => {
  const [questions, setQuestions] = useState([]);
  const [searchQuestion, setSearchQuestion] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editQuestion, setEditQuestion] = useState(null);
  const [newQuestion, setNewQuestion] = useState({
    question: '',
    answer: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/questions`);
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleEditQuestion = (question) => {
    setEditQuestion(question);
    setNewQuestion({
      question: question.question,
      answer: question.answer,
    });
    setShowAddForm(true);
  };

  const deleteQuestion = async (questionId) => {
    try {
      await axios.delete(`http://localhost:5000/questions/${questionId}`);
      setQuestions(questions.filter((q) => q.id !== questionId));
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  const handleAddQuestion = async () => {
    try {
      if (editQuestion) {
        // Edit existing question
        await axios.put(`http://localhost:5000/questions/${editQuestion.id}`, newQuestion);
        setQuestions(
          questions.map((q) => (q.id === editQuestion.id ? { ...q, ...newQuestion } : q))
        );
        setEditQuestion(null);
      } else {
        // Add new question
        const response = await axios.post(`http://localhost:5000/questions`, newQuestion);
        setQuestions([...questions, response.data]);
      }
      setNewQuestion({ question: '', answer: '' });
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding/editing question:', error);
    }
  };

  const filteredQuestions = questions.filter((q) =>
    q.question.toLowerCase().includes(searchQuestion.toLowerCase())
  );

  return (
    <div className="w-full min-h-full p-4 mt-16 overflow-x-auto text-black">
      <h1 className="mb-4 text-3xl font-bold">Frequently Asked Questions</h1>

      <div className="mb-4">
        <button
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none"
          onClick={() => {
            setShowAddForm(true);
            setEditQuestion(null);
          }}
        >
          Add Question
        </button>
      </div>

      {showAddForm && (
        <div className="mb-4">
          <h2 className="mb-2 text-lg font-semibold">
            {editQuestion ? 'Edit Question' : 'Add Question'}
          </h2>
          <div className="flex flex-col">
            <label htmlFor="newQuestion" className="mb-1 text-sm font-medium">
              Question:
            </label>
            <textarea
              id="newQuestion"
              value={newQuestion.question}
              onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
              className="p-2 border border-gray-300 rounded-md resize-none"
              required
            />
          </div>
          <div className="flex flex-col mt-2">
            <label htmlFor="newAnswer" className="mb-1 text-sm font-medium">
              Answer:
            </label>
            <textarea
              id="newAnswer"
              value={newQuestion.answer}
              onChange={(e) => setNewQuestion({ ...newQuestion, answer: e.target.value })}
              className="p-2 border border-gray-300 rounded-md resize-none"
              required
            />
          </div>
          <button
            className="px-4 py-2 mt-4 font-bold text-white bg-green-500 rounded-lg hover:bg-green-600"
            onClick={handleAddQuestion}
          >
            {editQuestion ? 'Save Changes' : 'Add Question'}
          </button>
          <button
            className="px-4 py-2 mt-4 ml-2 font-bold text-gray-800 bg-gray-300 rounded-lg hover:bg-gray-400"
            onClick={() => {
              setNewQuestion({ question: '', answer: '' });
              setShowAddForm(false);
              setEditQuestion(null);
            }}
          >
            Cancel
          </button>
        </div>
      )}

      <div className="flex mb-4">
        <form className="w-90">
          <label htmlFor="default-search" className="mb-2 text-sm font-medium sr-only">
            Search
          </label>
          <div className="relative flex w-full">
            <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block p-2 text-sm text-black border border-gray-300 rounded-lg xl:w-[600px] ps-10 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search Question"
              value={searchQuestion}
              onChange={(e) => setSearchQuestion(e.target.value)}
              required
            />
          </div>
        </form>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-black divide-y divide-gray-200">
          <thead className="bg-gray-600">
            <tr>
              <th scope="col" className="px-4 py-2 text-white sm:text-xs">
                ID
              </th>
              <th scope="col" className="px-4 py-2 text-white sm:text-xs">
                Question
              </th>
              <th scope="col" className="px-4 py-2 text-white sm:text-xs">
                Answer
              </th>
              <th scope="col" className="px-4 py-2 text-white sm:text-xs">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredQuestions.map((q) => (
              <tr key={q.id} className="text-black bg-white">
                <td className="text-center sm:text-xs">{q.id}</td>
                <td className="text-center sm:text-xs">{q.question}</td>
                <td className="text-center sm:text-xs">{q.answer}</td>
                <td className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEditQuestion(q)}
                    className="w-full p-3 text-center text-green-500 rounded-full cursor-pointer sm:text-xs hover:text-green-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteQuestion(q.id)}
                    className="w-full p-3 text-center text-red-500 rounded-full cursor-pointer sm:text-xs hover:text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FAQ;
