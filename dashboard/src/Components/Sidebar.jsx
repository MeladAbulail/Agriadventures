import React, { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  return (
    <div className="p-4 bg-white">
      <button className="text-green-500 focus:outline-none" onClick={toggleSidebar}>
        <HiMenu className="w-6 h-6" />
      </button>
    </div>
  );
};

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`fixed top-0 left-0 h-full z-50 bg-black text-green-500 p-4 transition-all transform ${isOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-8'}`}>
      {isOpen && (
        <div>
          <button className="text-green-500 focus:outline-none" onClick={toggleSidebar}>
            <HiX className="w-6 h-6" />
          </button>
          <ul className="mt-4">
            <Link to="/UserTable"><li className="p-2 m-2 text-xl bg-gray-800 rounded">UsersTable</li></Link>
            <Link to="/ActivitiesTable"><li className="p-2 m-2 text-xl bg-gray-800 rounded">Activities</li></Link>
            <Link to="/ProductsTable"><li className="p-2 m-2 text-xl bg-gray-800 rounded">Products</li></Link>
            <Link to="/Messages"><li className="p-2 m-2 text-xl bg-gray-800 rounded">Messages</li></Link>
            <Link to="/ConfirmPlace"><li className="p-2 m-2 text-xl bg-gray-800 rounded">Confirm Place</li></Link>
          </ul>
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-full">
        <Navbar toggleSidebar={toggleSidebar} />
      </div>

      <div className="flex-1 w-full">
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      </div>
    </div>
  );
};

export default App;