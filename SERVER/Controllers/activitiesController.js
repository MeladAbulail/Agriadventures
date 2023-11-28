const { Activities } = require('../Models/Tables');
const multer = require('multer');
const path = require('path');

// Storage Image By Multer Start
let lastFileSequence = 0;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'activitieImages');
  },
  filename: (req, file, cb) => {
    lastFileSequence++;
    const newFileName = `${Date.now()}_${lastFileSequence}${path.extname(file.originalname)}`;
    cb(null, newFileName);
  },
});

const addImage = multer({ storage: storage });
const imageActivity = addImage.single('image');

//! Get All Activities
const getAllActivities = async (req, res) => {
  try {

    const activities = await Activities.findAll({
      where: {
        isDeleted: false
      }
    }) 
    
    //! Map through the locations to construct the image_url for each location
    const activitiesWithImageUrls = activities.map(activitie => ({
      ...activitie.toJSON(),
      image_url: `http://localhost:4000/activitieImages/${activitie.activityImageName}`,
    }));

    res.status(200).json({
      success: true,
      message: "Activities retrieved successfully",
      activities: activitiesWithImageUrls
    })

  } catch(error) {
    console.error("An error occurred while adding the Activities:", error)
    res.status(500).json({
      success: false,
      message: "An error occurred while adding the Activities",
      error: error.message
    })
  }
}

//! Get Activitie By Id 
const getActivityById = async (req, res) => {
  try {
    const activityId = req.params.activityId

    //! Check If Location Existing
    const existingActivity = await Activities.findOne({
      where: {
        activityId: activityId
      }
    })

    if(!existingActivity) {
      return res.status(404).json({
        success: false,
        message: "Activity Not Found",
      })
    } else {
      const image_url = `http://localhost:4000/activitieImages/${existingActivity.activityImageName}`;
      const Activity = await Activities.findByPk(activityId);

      res.status(200).json({
        success: true,
        message: "Activity retrieved successfully",
        Location: {
          ...Activity.toJSON(),
          image_url: image_url,
        },
      });
    }
    } catch(error) {
    console.error('An Error Occurred While Fetching Activity:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching Activity',
      error: error.message,
    });
  }
}

//! Add New Activitie
const addNewActivitie = async (req, res) => {
  try {
    const { locationId } = req.params
    const { locationName, activityName, activityDescription, price, duration } = req.body
    const activityImageName = req.file.filename
    const addActivity = await Activities.create({
      locationId,
      locationName,
      activityName,
      activityDescription,
      activityImageName,
      price,
      duration,
    })

    res.status(200).json({
      success: true,
      message: "Activity added successfully",
      Activitie: addActivity.toJSON()
    })
  } catch(error) {
    console.error("An error occurred while adding the Activity:", error)
    res.status(500).json({
      success: false,
      message: "An error occurred while adding the Activity",
      error: error.message
    })
  }
}

//! Update  Activity By Id 
const updateActivityById = async (req, res) => {
  try {

    const { activityId } = req.params
    const { locationName, activityName, activityDescription, price, duration } = req.body;
    const existingActivity = await Activities.findByPk(activityId)
    
    if(!existingActivity) {
      return res.status(404).json({
        success: false,
        message: "Activity not found"
      })
    }

    //! Update Activity 
    existingActivity.locationName = locationName
    existingActivity.activityName = activityName
    existingActivity.activityDescription = activityDescription
    existingActivity.price = price
    existingActivity.duration = duration

    //! Check if a new image is uploaded
    if(req.file) {
      newImageName = req.file.filename
      existingActivity.activityImageName = newImageName
    }

    //! Save the changes
    await existingActivity.save()

    res.status(200).json({
      success: true,
      message: 'Activity updated successfully',
      Location: existingActivity.toJSON(),
    });

  } catch(error) {
    console.error("An error occurred while adding the Activity:", error)
    res.status(500).json({
      success: false,
      message: "An error occurred while adding the Activity",
      error: error.message
    })
  }
}

//! Soft delete Activity by ID Start
const deleteActivityById = async (req, res) => {
  try {

    const activityId = req.params.activityId

    //! Check if the location exists
    const existingLocation = await Activities.findByPk(activityId);

    if (!existingLocation) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found',
      });
    }

    await Activities.update(
      { isDeleted: true },
      { where: { activityId: activityId } }
    )

    //! Save the changes
    await existingLocation.save();

    res.status(200).json({
      success: true,
      message: "Activity soft deleted successfully",
      activity: existingLocation.toJSON()
    })

  } catch(error) {
    console.error("An error occurred while adding the Activity:", error)
    res.status(500).json({
      success: false,
      message: "An error occurred while adding the Activity",
      error: error.message
    })
  }
}

//! Get Activities By Location Id
const getActivitiesByLocationId = async (req, res) => {
  try {

    const { locationId } = req.params
    const activitiesByLocationId = await Activities.findAll({
      where: {
        locationId: locationId
      }
    })

    //! Map through the locations to construct the image_url for each location
    const activitiesWithImageUrls = activitiesByLocationId.map(activitie => ({
      ...activitie.toJSON(),
      image_url: `http://localhost:4000/activitieImages/${activitie.activityImageName}`,
    }));

    res.status(200).json({
      success: true,
      message: "Activities retrieved successfully",
      Activities: activitiesWithImageUrls
    })

  } catch(error) {
    console.error("An error occurred while adding the Activities:", error)
    res.status(500).json({
      success: false,
      message: "An error occurred while adding the Activities",
      error: error.message
    })
  }
}

module.exports = {
  imageActivity,
  getAllActivities,
  getActivityById,
  addNewActivitie,
  updateActivityById,
  deleteActivityById,
  getActivitiesByLocationId
}