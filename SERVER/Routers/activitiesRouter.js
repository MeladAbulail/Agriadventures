const express = require('express');
const activitiesController = require('../Controllers/activitiesController');
const router = express.Router();

router.get('/Get_All_Activities', activitiesController.getAllActivities);
router.get('/Get_Activitie_By_Id/:activityId', activitiesController.getActivityById);
router.get('/Get_Activitie_By_locationId/:locationId', activitiesController.getActivitiesByLocationId);
router.post('/Add_New_Activitie/:locationId', activitiesController.imageActivity, activitiesController.addNewActivitie);
router.put('/Update_Activitie_By_Id/:activityId', activitiesController.imageActivity, activitiesController.updateActivityById);
router.delete('/Delete_Activitie_By_Id/:activityId', activitiesController.deleteActivityById);

module.exports = router;