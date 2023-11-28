const sequelize = require('./db')
const { DataTypes } = require("sequelize");

//? Done
//! User TAble Modul 
const User = sequelize.define("User", {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  userRole: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "user",
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  imageName: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "1699856659448_1.jpg",
  },
});

//? Done
//! Locations Table Model 
const Locations = sequelize.define('Locations', {
  locationId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  locationName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  owner: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Public',
  },
  description: {
    type: DataTypes.STRING,
  },
  category: {
    type: DataTypes.STRING,
  },
  openingHours: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  locationImageName: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
});


//! Ratings and Reviews Taple Model 
const Ratings_And_Reviews = sequelize.define('Ratings_And_Reviews', {
  RatingsAndReviewsId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  locationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userComment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  locationRating: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

//? Done
//! Activities Table Model 
const Activities = sequelize.define('Activities', {
  activityId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  locationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  locationName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  activityName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  activityDescription: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  activityImageName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
  duration: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

//? Done
//! Contact Table Model 
const Contact_us = sequelize.define('Contact_us', {
  contactUsId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  messageStatus: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Unread",
  },
  messageCategory: {
    type: DataTypes.STRING,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

//! Reservations Table Model 
const Reservation = sequelize.define('Reservation', {
  reservationId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  locationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  reservationDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  visitDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  numberOfVisitors: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  reservationDetails: {
    type: DataTypes.TEXT,
  },
  reservationStatus: {
    type: DataTypes.STRING,
  },
  paymentInformation: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.FLOAT,
  },
  paymentMethod: {
    type: DataTypes.STRING,
  },
  contactInformation: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
  },
  additionalComments: {
    type: DataTypes.TEXT,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

//! Cart Table Model 
const Cart = sequelize.define('Cart', {
  cartId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  imageProductName: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});


//? Done
//! Products Table Model 
const Products = sequelize.define('Products', {
  productId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageProductName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

//! Orders Table Model 
const Orders = sequelize.define('Orders', {
  orderId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  orderStatus: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Pending",
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});


//! Function For User TAble Modul
const CreateUsersTable = () => {
  User.sync({ alter: true })
    .then(() => {
      console.log("User Table Created");
    })
    .catch((error) => {
      console.log("Ann Error Occurred", error);
    })
}

//! Function For Locations TAble Modul
const CreateLocationsTable = () => {
  Locations.sync({ alter: true })
    .then(() => {
      console.log("Locations Table Created");
    })
    .catch((error) => {
      console.error("Error creating Locations table:", error);
    });
}

//! Function For Ratings_And_Reviews TAble Modul
const CreateRatingsAndReviewsTable = () => {
  Ratings_And_Reviews.sync({ alter: true })
    .then(() => {
      console.log("Locations Table Created");
    })
    .catch((error) => {
      console.log("Ann Error Occurred", error);
    })
}

//! Function For Activities TAble Modul
const CreateActivitiesTable = () => {
  Activities.sync({ alter: true })
    .then(() => {
      console.log("User Table Created");
    })
    .catch((error) => {
      console.log("Ann Error Occurred", error);
    })
}

//! Function For Contact_us TAble Modul
const CreateContactUsTable = () => {
  Contact_us.sync({ alter: true })
    .then(() => {
      console.log("Locations Table Created");
    })
    .catch((error) => {
      console.log("Ann Error Occurred", error);
    })
}

//! Function For Reservation TAble Modul
const CreateReservationTable = () => {
  Reservation.sync({ alter: true })
    .then(() => {
      console.log("User Table Created");
    })
    .catch((error) => {
      console.log("Ann Error Occurred", error);
    })
}

//! Function For Cart TAble Modul
const CreateCartTable = () => {
  Cart.sync({ alter: true })
    .then(() => {
      console.log("User Table Created");
    })
    .catch((error) => {
      console.log("Ann Error Occurred", error);
    })
}

//! Function For Products TAble Modul
const CreateProductsTable = () => {
  Products.sync({ alter: true })
    .then(() => {
      console.log("User Table Created");
    })
    .catch((error) => {
      console.log("Ann Error Occurred", error);
    })
}

//! Function For Orders TAble Modul
const CreateOrdersTable = () => {
  Orders.sync({ alter: true })
    .then(() => {
      console.log("User Table Created");
    })
    .catch((error) => {
      console.log("Ann Error Occurred", error);
    })
}

module.exports = {
  CreateUsersTable,
  CreateLocationsTable,
  CreateRatingsAndReviewsTable,
  CreateActivitiesTable,
  CreateContactUsTable,
  CreateReservationTable,
  CreateCartTable,
  CreateProductsTable,
  CreateOrdersTable,
  User,
  Locations,
  Ratings_And_Reviews,
  Activities,
  Contact_us,
  Reservation,
  Cart,
  Products,
  Orders,
}

