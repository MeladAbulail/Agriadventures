require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
require('./Middleware/auth');
const poet = 4000;
const userRouter = require('./Routers/userRouter');
const authRouter = require('./Routers/authRouter');
const locationsRouter = require("./Routers/locationsRouter")
const productsRouter = require("./Routers/productsRouter")
const contactUsRouter = require("./Routers/contactUsRouter")
// const activitiesRouter = require("./Routers/activitiesRouter")
const cartRouter = require("./Routers/cartRouter")
const paymentRouter = require("./Routers/paymentRouter")
const bookRouter = require("./Routers/bookRouter")
const orderRouter = require("./Routers/orderRouter")
const reservationController = require("./Routers/reservationRouter")
const ratingsAndReviewsRouter  = require("./Routers/ratingsAndReviewsRouter")
const { CreateUsersTable, CreateLocationsTable, 
  CreateRatingsAndReviewsTable, CreateActivitiesTable, CreateContactUsTable, 
  CreateReservationTable, CreateCartTable, CreateProductsTable, 
  CreateOrdersTable } = require("./Models/Tables")
  
app.use(cors());
app.use(express.json());
app.use(session({ secret: process.env.SESSION_SECRET_KEY, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(userRouter);
app.use(authRouter);
app.use(locationsRouter);
app.use(productsRouter);
app.use(contactUsRouter);
app.use(cartRouter);
app.use(paymentRouter);
app.use(orderRouter);
app.use(reservationController);
app.use(ratingsAndReviewsRouter);
app.use(bookRouter);

//! Create Tables  
// CreateUsersTable() //! Done
// CreateLocationsTable() //! Done
// CreateRatingsAndReviewsTable() //! Done 
// CreateActivitiesTable() //! Done 
// CreateContactUsTable() //! Done
// CreateReservationTable() //! Done
// CreateCartTable() //! Done
// CreateProductsTable() //! Done
// CreateOrdersTable() //! Done
// // CreatePaymentTable() //! Done

app.listen(poet, () => {
  console.log(`Server is running on port ${poet}`);
});