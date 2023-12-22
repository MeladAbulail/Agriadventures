// Import necessary modules
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
 } from 'react-router-dom';

import Signinpage from './Components/LoginRegister/Signinpage';
import Homepage from './Components/Homepage/Homepage';
import Categorypage from './Components/Category/Categorypage';
import Storepage from './Components/Store/Storepage';
import Aboutuspage from './Components/AboutusContactus/Aboutuspage';
import Contactuspage from './Components/AboutusContactus/Contactuspage';
import Profilepage from './Components/Profilepage/Profilepage';
import ProductDetailsPage from './Components/Productdetails/ProductDetailsPage';
import Cartpage from './Components/Cart/Cartpage';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Registerpage from './Components/LoginRegister/Registerpage';
import Gallerypage from './Components/Gallery/Gallerypage';
import Payment from './Components/Payment';
import Book from './Components/Book';
import ActivitiesDetails from './Components/ActivityDetails/ActivityDetails';
import AddPlace from './Components/Homepage/AddPlace';
import AddProduct from './Components/Homepage/AddProduct';
import E404 from './Components/E404';
import FAQ from './Components/FAQ';
import Cookies from 'js-cookie';
import './App.css';

export const tprice = React.createContext();

function App() {
  const token = Cookies.get('token');
  return (
    <div className="App">
      <Router>
        {/* Show Navbar only if showNavbar is true */}
        <Navbar />

        <div className="content">
          <Routes>
            {/* Define your routes here */}
            <Route path="/" element={<Homepage />} />
            <Route path="/Category" element={<Categorypage />} />
            <Route path="/Store" element={<Storepage />} />
            <Route path="/Signin" element={<Signinpage />} />
            <Route path="/Register" element={<Registerpage />} />
            <Route path="/Aboutus" element={<Aboutuspage />} />
            <Route path="/Contactus" element={<Contactuspage />} />
            <Route path="/Profile" element={<Profilepage />} />
            <Route path="/Cart" element={<Cartpage />} />
            <Route
              path="/ProductDetailsPage/:productId"
              element={<ProductDetailsPage />}
            />
            <Route path="/Gallery" element={<Gallerypage />} />
            <Route path="/Payment" element={<Payment />} />
            <Route
              path="/ActivitiesDetails/:locationId"
              element={<ActivitiesDetails />}
            />
            <Route path="/Book" element={<Book />} />
            <Route path="/AddPlace" element={<AddPlace />} />
            <Route path="/AddProduct" element={<AddProduct />} />
            <Route path="/FAQ" element={<FAQ />} />
            <Route path="*" element={<E404 />} />
          </Routes>
        </div>

        {/* Show Footer only if showNavbar is true */}
        <Footer />
      </Router>
    </div>
  );
}

export default App;
