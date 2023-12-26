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
    allowNull: true,
    defaultValue: "User",
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
    allowNull: true,
    defaultValue: "Undefined",
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
  isBanned: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  }
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
  TheBeginningAndEndOfTheJourney: {
    type: DataTypes.JSONB, 
    allowNull: false,
  },
  workdays: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  TicketPricePerPerson: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  numberOfResidents: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  totalStars: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  phone: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  evaluation: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: null,
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

module.exports = Locations;


//! Ratings and Reviews Taple Model 
const Ratings_And_Reviews_Locations = sequelize.define('Ratings_And_Reviews_Locations', {
  ratingsAndReviewsLocationsId: {
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
  isDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  readable: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  }
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
    allowNull: false,
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
    allowNull: false,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  completeOrIncomplete: {
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
  ViewTheProduct: {
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
  ordersReceived: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  }
});

const FAQ = sequelize.define("FAQ", {
  faqId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  question: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  answer: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

const FavoritesProducts = sequelize.define("FavoritesProducts", {
  favoritesProductsId: {
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
  isDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

const FavoritesLocations = sequelize.define("FavoritesLocations", {
  favoritesLocationsId: {
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

//! Function For Ratings_And_Reviews_Locations TAble Modul
const CreateRatingsAndReviewsTable = () => {
  Ratings_And_Reviews_Locations.sync({ alter: true })
    .then(() => {
      console.log("Ratings_And_Reviews_Locations Table Created");
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

//! Function For FAQ TAble Modul
const CreateFAQTable = () => {
FAQ.sync({ alter: true })
  .then(() => {
    console.log("FAQ Table Created");
  })
  .catch((error) => {
    console.error("Error creating FAQ table:", error);
  });
}

//! Function For FavoritesProducts TAble Modul
const CreateFavoritesProductsTable = () => {
  FavoritesProducts.sync({ alter: true })
    .then(() => {
      console.log("Favorites Products Table Created");
    })
    .catch((error) => {
      console.error("Error creating Favorites Products table:", error);
    });
  }

//! Function For FavoritesLocations TAble Modul
const CreateFavoritesLocationsTable = () => {
  FavoritesLocations.sync({ alter: true })
    .then(() => {
      console.log("Favorites Locations Table Created");
    })
    .catch((error) => {
      console.error("Error creating Favorites Locations table:", error);
    });
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
  CreateFAQTable,
  CreateFavoritesProductsTable,
  CreateFavoritesLocationsTable,
  User,
  Locations,
  Ratings_And_Reviews_Locations,
  Contact_us,
  Reservation,
  Cart,
  Products,
  Orders,
  Ratings_And_Reviews_Product,
  FAQ,
  FavoritesProducts,
  FavoritesLocations
}

