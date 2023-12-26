import React, { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';

const Navbar = ({ toggleSidebar }) => {
  return (
    <div className="p-4 bg-white">
      <button className="text-green-500 focus:outline-none" onClick={toggleSidebar}>
        <HiMenu className="w-6 h-6" />
      </button>
    </div>
  );
};

const handleLogout = () => {
  Cookies.remove('token');
  Cookies.remove('userId');
  window.location.href = '/';
};

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`z-50 fixed top-0 left-0 h-full bg-black text-green-500 p-4  transform ${isOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-8'}`}>
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
            <Link to="/FAQ"><li className="p-2 m-2 text-xl bg-gray-800 rounded">FAQ</li></Link>
            <Link to="/ConfirmPlace"><li className="p-2 m-2 text-xl bg-gray-800 rounded">Confirm Place</li></Link>
            <Link to="/ConfirmProduct"><li className="p-2 m-2 text-xl bg-gray-800 rounded">Confirm Product</li></Link>
            <Link to="/LoginPage"><button className="w-full px-4 py-2 text-white bg-red-500 rounded-full hover:bg-red-600" onClick={handleLogout}>Logout</button></Link>
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