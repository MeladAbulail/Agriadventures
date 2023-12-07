import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signinpage from './Components/LoginRegister/Signinpage';
import Homepage from './Components/Homepage/Homepage';
import Categorypage from './Components/Category/Categorypage';
import Storepage from './Components/Store/Storepage';
import Aboutuspage from './Components/AboutusContactus/Aboutuspage';
import Contactuspage from './Components/AboutusContactus/Contactuspage';
import Submitplacepage from './Components/AboutusContactus/Submitplacepage';
import Profilepage from './Components/Profilepage/Profilepage';
import ProductDetailsPage from './Components/Productdetails/ProductDetailsPage';
import Cartpage from './Components/Cart/Cartpage';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Registerpage from './Components/LoginRegister/Registerpage';
import Gallerypage from './Components/Gallery/Gallerypage';
import E404 from './Components/E404';
import Payment from './Components/Payment';
import Book from './Components/Book';
import './App.css';
import Dashboard from './Components/dashboard'
import ActivitiesDetails from './Components/ActivityDetails/ActivityDetails'
import AddPlace from './Components/Homepage/AddPlace'
import AddProduct from './Components/Homepage/AddProduct'
import React from 'react';


export const tprice = React.createContext();


function App() {
  return (
    <div className="App">
      
        <Router>
          <Navbar />
          <hr></hr>
          <div className="content">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/dd" element={<Dashboard />} />
              <Route path="/Category" element={<Categorypage />} />
              <Route path="/Store" element={<Storepage />} />
              <Route path="/Aboutus" element={<Aboutuspage />} />
              <Route path="/Contactus" element={<Contactuspage />} />
              <Route path="/Profile" element={<Profilepage />} />
              <Route path="/Cart" element={<Cartpage />} />
              <Route
                path="/ProductDetailsPage/:productId"
                element={<ProductDetailsPage />}
              />
              <Route path="/Gallery" element={<Gallerypage />} />
              <Route path="/Signin" element={<Signinpage />} />
              <Route path="/Register" element={<Registerpage />} />
              {/* <Route path="/Submitplacepage" element={<Submitplacepage />} /> */}
              <Route path="/E404" element={<E404 />} />
              <Route path="/Payment" element={<Payment />} />
              <Route
                path="/ActivitiesDetails/:locationId"
                element={<ActivitiesDetails />}
              />
              <Route path="/Book" element={<Book />} />
              <Route path="/AddPlace" element={<AddPlace />} />
              <Route path="/AddProduct" element={<AddProduct />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </div>

  );
}
export default App;
