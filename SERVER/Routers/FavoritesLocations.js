const express = require('express');
const FavoritesLocations = require('../Controllers/FavoritesLocations');
const Router = express.Router();
const { authorize } = require('../Middleware/Authorization');

Router.post('/Add_New_Favorites_Locations/:locationId', authorize(["user", "Admin"]), FavoritesLocations.addFavoritesLocations);
Router.get('/Get_Favorites_Locations_By_UserId', authorize(["user", "Admin"]), FavoritesLocations.getFavoritesLocationsByUserId);
Router.get('/Get_Favorites_Locations_By_LocationId/:locationId', authorize(["user", "Admin"]), FavoritesLocations.getFavoritesLocationsByLocationId);
Router.delete('/Delete_Favorites_Locations/:locationId', authorize(["user", "Admin"]), FavoritesLocations.deleteFavoritesLocation);

module.exports = Router;