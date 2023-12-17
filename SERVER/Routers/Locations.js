const express = require('express');
const Router = express.Router();
const Locations = require('../Controllers/Locations');
const { uploadImg } = require('../Middleware/Firebase');

Router.get('/Get_All_Locations', Locations.getAllLocations);
Router.get('/Get_Location_By_Id/:locationId', Locations.getLocationById);
Router.get('/Get_Location_By_Date', Locations.getByDate);
Router.get('/Get_Location_By_ViewThePlace', Locations.getLocationByViewThePlace);
Router.post('/Add_New_Location', uploadImg, Locations.addLocation);
Router.put('/Update_Location_By_Id/:locationId', uploadImg, Locations.updateLocationById);
Router.put('/View_The_Place/:locationId', Locations.viewThePlace);
Router.delete('/Delete_Location_By_Id/:locationId', Locations.deleteLocationById);


module.exports = Router;
