const sequelize = require('./Db')
const { DataTypes } = require("sequelize");

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
  imageUrl: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

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
    type: DataTypes.TEXT,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  openingHours: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  visitDate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  numberOfResidents: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  totalStars: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  phone: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  evaluation: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: null
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  ViewThePlace: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  imageUrl: {
    type: DataTypes.TEXT,
    allowNull: true, 
  },
});

//! Ratings and Reviews Taple Model 
const Ratings_And_Reviews = sequelize.define('Ratings_And_Reviews', {
  ratingsAndReviewsId: {
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
  locationName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  rating: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  imageUrl: {
    type: DataTypes.TEXT,
    allowNull: true, 
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  postDate: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

//! Ratings and Reviews Taple Model 
const Ratings_And_Reviews_Product = sequelize.define('Ratings_And_Reviews_Product', {
  ratingsAndReviewsProductId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  rating: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  imageUrl: {
    type: DataTypes.TEXT,
    allowNull: true, 
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  postDate: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

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
  username: {
    type: DataTypes.STRING,
    allowNull: false,
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
  visitDate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numberOfVisitors: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  locationName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
  },
  cardholder: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
  },
  state: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
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
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  productName: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.TEXT, 
    allowNull: false,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

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
  category: {
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
  imageUrl: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  owner: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Public',
  },
  numberOfResidents: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  totalStars: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  phone: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  evaluation: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: null
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ViewThePlace: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
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
  cardholder: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
  },
  state: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
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
      console.log("Ratings_And_Reviews Table Created");
    })
    .catch((error) => {
      console.log("Ann Error Occurred", error);
    })
}

//! Function For Ratings_And_Reviews_Product TAble Modul
const CreateRatingsAndReviewsProductTable = () => {
  Ratings_And_Reviews_Product.sync({ alter: true })
    .then(() => {
      console.log("Ratings_And_Reviews_Product Table Created");
    })
    .catch((error) => {
      console.log("Ann Error Occurred", error);
    })
}

//! Function For Activities TAble Modul
const CreateActivitiesTable = () => {
  Activities.sync({ alter: true })
    .then(() => {
      console.log("Activities Table Created");
    })
    .catch((error) => {
      console.log("Ann Error Occurred", error);
    })
}

//! Function For Contact_us TAble Modul
const CreateContactUsTable = () => {
  Contact_us.sync({ alter: true })
    .then(() => {
      console.log("Contact_us Table Created");
    })
    .catch((error) => {
      console.log("Ann Error Occurred", error);
    })
}

//! Function For Reservation TAble Modul
const CreateReservationTable = () => {
  Reservation.sync({ alter: true })
    .then(() => {
      console.log("Reservation Table Created");
    })
    .catch((error) => {
      console.log("Ann Error Occurred", error);
    })
}

//! Function For Cart TAble Modul
const CreateCartTable = () => {
  Cart.sync({ alter: true })
    .then(() => {
      console.log("Cart Table Created");
    })
    .catch((error) => {
      console.log("Ann Error Occurred", error);
    })
}

//! Function For Products TAble Modul
const CreateProductsTable = () => {
  Products.sync({ alter: true })
    .then(() => {
      console.log("Products Table Created");
    })
    .catch((error) => {
      console.log("Ann Error Occurred", error);
    })
}

//! Function For Orders TAble Modul
const CreateOrdersTable = () => {
  Orders.sync({ alter: true })
    .then(() => {
      console.log("Orders Table Created");
    })
    .catch((error) => {
      console.log("Ann Error Occurred", error);
    })
}

module.exports = {
  CreateUsersTable,
  CreateLocationsTable,
  CreateRatingsAndReviewsTable,
  CreateRatingsAndReviewsProductTable,
  CreateActivitiesTable,
  CreateContactUsTable,
  CreateReservationTable,
  CreateCartTable,
  CreateProductsTable,
  CreateOrdersTable,
  User,
  Locations,
  Ratings_And_Reviews,
  Contact_us,
  Reservation,
  Cart,
  Products,
  Orders,
  Ratings_And_Reviews_Product
}

