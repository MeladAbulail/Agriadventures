const { Router } = require('express');
const locationsController = require('../Controllers/locationsController');
const { uploadImg } = require('../Middleware/firebase');
const router = Router();

router.get('/Get_All_Locations', locationsController.getAllLocations);
router.get('/Get_Location_By_Id/:locationId', locationsController.getLocationById);
router.get('/Get_Location_By_Date', locationsController.getByDate);
router.get('/Get_Location_By_ViewThePlace', locationsController.getLocationByViewThePlace);
router.post('/Add_New_Location', uploadImg, locationsController.addLocation);
router.put('/Update_Location_By_Id/:locationId', uploadImg, locationsController.updateLocationById);
router.put('/View_The_Place/:locationId', locationsController.viewThePlace);
router.delete('/Delete_Location_By_Id/:locationId', locationsController.deleteLocationById);


module.exports = router;
