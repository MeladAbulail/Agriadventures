const express = require('express');
const FavoritesLocations = require('../Controllers/FavoritesLocations');
const Router = express.Router();
const { authorize } = require('../Middleware/Authorization');

Router.post('/Add_New_Favorites_Locations/:locationId', authorize(["User", "Admin"]), FavoritesLocations.addFavoritesLocations);
Router.get('/Get_Favorites_Locations_By_UserId', authorize(["User", "Admin"]), FavoritesLocations.getFavoritesLocationsByUserId);
Router.get('/Get_Favorites_Locations_By_LocationId/:locationId', authorize(["User", "Admin"]), FavoritesLocations.getFavoritesLocationsByLocationId);
Router.delete('/Delete_Favorites_Locations/:locationId', authorize(["User", "Admin"]), FavoritesLocations.deleteFavoritesLocation);

module.exports = Router;