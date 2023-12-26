require("dotenv").config();
require('./Models/Auth');
const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');
const passport = require("passport");
const cookieParser = require('cookie-parser');
const port = process.env.Port;
const User = require('./Routers/User');
const Locations = require("./Routers/Locations")
const Products = require("./Routers/Products")
const ContactUs = require("./Routers/ContactUs")
const AuthByGoogle = require("./Routers/AuthByGoogle")
const Cart = require("./Routers/Cart")
const BuyProducts = require("./Routers/BuyProducts")
const BookLocations = require("./Routers/BookLocations")
const Order = require("./Routers/Order")
const Reservation = require("./Routers/Reservation")
const RatingsAndReviewsLocation  = require("./Routers/RatingsAndReviewsLocation")
const RatingsAndReviewsProduct = require("./Routers/RatingsAndReviewsProduct")
const FAQ = require("./Routers/FAQ")
const FavoritesLocations = require("./Routers/FavoritesLocations")
const FavoritesProducts = require("./Routers/FavoritesProducts")
const { CreateUsersTable, CreateLocationsTable, CreateRatingsAndReviewsTable, CreateActivitiesTable, CreateContactUsTable, CreateReservationTable, CreateCartTable, CreateProductsTable, CreateOrdersTable, CreateRatingsAndReviewsProductTable, CreateFAQTable, CreateFavoritesProductsTable, CreateFavoritesLocationsTable } = require("./Models/Tables")

app.use(cors());
app.use(express.json());
app.use(session({ secret: process.env.SESSION_SECRET_KEY, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(User);
app.use(Locations);
app.use(AuthByGoogle);
app.use(Products);
app.use(ContactUs);
app.use(Cart);
app.use(BuyProducts);
app.use(BookLocations);
app.use(Order);
app.use(Reservation);
app.use(RatingsAndReviewsLocation);
app.use(RatingsAndReviewsProduct);
app.use(FAQ);
app.use(FavoritesLocations);
app.use(FavoritesProducts);

if(false) {CreateUsersTable(), CreateLocationsTable(), CreateRatingsAndReviewsTable(), CreateContactUsTable(), CreateReservationTable(), CreateCartTable(), CreateProductsTable(), CreateOrdersTable(), CreateRatingsAndReviewsProductTable(), CreateFAQTable(), CreateFavoritesProductsTable(), CreateFavoritesLocationsTable()} 

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});