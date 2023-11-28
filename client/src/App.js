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
import Eventdetailspage from './Components/Eventdetails/Eventdetailspage';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Registerpage from './Components/LoginRegister/Registerpage';
import Gallerypage from './Components/Gallery/Gallerypage';
import E404 from './Components/E404';
import './App.css';
import Dashboard from './Components/Dashboard/dashboard'

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
            <Route path="/ProductDetailsPage/:id" element={<ProductDetailsPage/>} />
            <Route path="/Gallery" element={<Gallerypage />} />
            <Route path="/Signin" element={<Signinpage />} />
            <Route path="/Register" element={<Registerpage />} />
            <Route path="/Submitplacepage" element={<Submitplacepage />} />
            <Route path="/Eventdetailspage/:id" element={<Eventdetailspage />} />
            <Route path="/E404" element={<E404 />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
