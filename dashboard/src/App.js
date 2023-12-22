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
import ConfirmProduct from './Components/ConfirmProduct'
import AddPlace from './Components/AddPlace'
import AddProduct from './Components/AddProduct'
import FAQ from "./Components/FAQ"

import './App.css';

function App() {

  const token = Cookies.get('token');

  return (
    <div className="bg-white App">
      <div className="flex ">
        <BrowserRouter>
          {token ? <Sidebar  className="w-10% h-full"/> : null}
          <div className='w-11/12'>
          <div className="w-full">
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/UserTable" element={<UsersTable />} />
              <Route path="/FAQ" element={<FAQ/>}/>
              <Route path="/ActivitiesTable" element={<ActivitiesTable />} />
              <Route path="/ProductsTable" element={<ProductsTable />} />
              <Route path="/Messages" element={<Messages />} />
              <Route path="/ConfirmPlace" element={<ConfirmPlace />} />
              <Route path="/ConfirmProduct" element={<ConfirmProduct />} />
              <Route path="/AddPlace" element={<AddPlace/>} />
              <Route path="/AddProduct" element={<AddProduct/>} />
            </Routes>
            </div>
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
