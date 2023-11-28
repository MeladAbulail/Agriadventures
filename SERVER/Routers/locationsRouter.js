const { Router } = require('express');
const locationsController = require('../Controllers/locationsController');
const router = Router();

router.get('/Get_All_Locations', locationsController.getAllLocations);
router.get('/Get_Location_By_Id/:locationId', locationsController.getLocationById);
router.get('/Get_Location_By_Date', locationsController.getByDate);
router.post('/Add_New_Location', locationsController.imageProduct, locationsController.addLocation);
router.put('/Update_Location_By_Id/:locationId', locationsController.imageProduct, locationsController.updateLocationById);
router.delete('/Delete_Location_By_Id/:locationId', locationsController.deleteLocationById);

module.exports = router;
