require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
require('./middleware/auth');
const path = require("path");
const 
{ CreateUsersTable, CreateLocationsTable, 
  CreateRatingsAndReviewsTable, CreateActivitiesTable, CreateContactUsTable, 
  CreateReservationTable, CreateCartTable, CreateProductsTable, 
  CreateOrdersTable, } = require("./Models/Tables")
const poet = 4000;

const userRouter = require('./Routers/userRouter');
const authRouter = require('./Routers/authRouter');
const locationsRouter = require("./Routers/locationsRouter")
const productsRouter = require("./Routers/productsRouter")
const contactUsRouter = require("./Routers/contactUsRouter")
const activitiesRouter = require("./Routers/activitiesRouter")
const cartRouter = require("./Routers/cartRouter")

app.use(cors());
app.use(express.json());
app.use(session({ secret: process.env.SESSION_SECRET_KEY, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/productsImages", express.static(path.join(__dirname, "productsImages")));
app.use("/profileImages", express.static(path.join(__dirname, "profileImages")));
app.use("/locationImages", express.static(path.join(__dirname, "locationImages")));
app.use("/activitieImages", express.static(path.join(__dirname, "activitieImages")));

app.use(userRouter);
app.use(authRouter);
app.use(locationsRouter);
app.use(productsRouter);
app.use(contactUsRouter);
app.use(activitiesRouter);
app.use(cartRouter);

//! Create Tables  
CreateUsersTable() //! Done
CreateLocationsTable() //! Done
CreateRatingsAndReviewsTable() 
CreateActivitiesTable() //! Done 
CreateContactUsTable() //! Done
CreateReservationTable()
CreateCartTable()
CreateProductsTable() //! Done
CreateOrdersTable()

app.listen(poet, () => {
  console.log(`Server is running on port ${poet}`);
});





















