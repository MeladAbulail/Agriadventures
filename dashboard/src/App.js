import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cookies from 'js-cookie';  // Import the js-cookie library
import Sidebar from './Components/Sidebar';
import UsersTable from './Components/UsersTable';
import ProductsTable from './Components/ProductsTable';
import Messages from './Components/Messages';
import ConfirmPlace from './Components/ConfirmPlace';
import ActivitiesTable from './Components/ActivitiesTable';
import LoginPage from './Components/LoginPage';

import './App.css';

function App() {

  const token = Cookies.get('token');

  return (
    <div className="bg-white App">
      <div className="flex ">
        <BrowserRouter>
          {token ? <div><Sidebar/></div> :<div className='z-10'> <Sidebar/> </div>}
          <div className="w-full">
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/UserTable" element={<UsersTable />} />
              <Route path="/ActivitiesTable" element={<ActivitiesTable />} />
              <Route path="/ProductsTable" element={<ProductsTable />} />
              <Route path="/Messages" element={<Messages />} />
              <Route path="/ConfirmPlace" element={<ConfirmPlace />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
