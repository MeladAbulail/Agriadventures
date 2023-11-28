const { Locations } = require('../Models/Tables');
const multer = require('multer');
const path = require('path');
const { Op } = require('sequelize');

// Storage Image By Multer Start
let lastFileSequence = 0;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'locationImages');
  },
  filename: (req, file, cb) => {
    lastFileSequence++;
    const newFileName = `${Date.now()}_${lastFileSequence}${path.extname(file.originalname)}`;
    cb(null, newFileName);
  },
});

const addImage = multer({ storage: storage });
const imageProduct = addImage.single('image');


//! Add New Location Start
const addLocation = async (req, res) => {
  try {
    const { locationName, owner, description, category, openingHours, price } = req.body;
    const locationImageName = req.file.filename;

    const newLocation = await Locations.create({
      locationName,
      owner,
      description,
      category,
      openingHours,
      price,
      locationImageName
    });

    res.status(201).json({
      success: true,
      message: 'Locations added successfully',
      locations: newLocation.toJSON(),
    });
  } catch (error) {
    console.error('An error occurred while adding the Locations:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while adding the Locations',
      error: error.message,
    });
  }
};


//! Update Location by ID Start
const updateLocationById = async (req, res) => {
  try {
    const { locationId } = req.params; 
    const { locationName, owner, description, category, openingHours, price } = req.body;

    //! Check if the Location exists
    const existingLocation = await Locations.findByPk(locationId);

    if (!existingLocation) {
      return res.status(404).json({
        success: false,
        message: 'Location not found',
      });
    }

    //! Update the Location details
    existingLocation.locationName = locationName;
    existingLocation.owner = owner;
    existingLocation.description = description;
    existingLocation.category = category;
    existingLocation.openingHours = openingHours;
    existingLocation.price = price;

    //! Check if a new image is uploaded
    if (req.file) {
      const newImageName = req.file.filename;
      existingLocation.locationImageName = newImageName;
    }

    //! Save the changes
    await existingLocation.save();

    res.status(200).json({
      success: true,
      message: 'Location updated successfully',
      Location: existingLocation.toJSON(),
    });
  } catch (error) {
    console.error('An error occurred while updating the Location:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while updating the Location',
      error: error.message,
    });
  }
};


//! Soft delete location by ID Start
const deleteLocationById = async (req, res) => {
  try {
    const { locationId } = req.params;

    //! Check if the location exists
    const existingLocation = await Locations.findByPk(locationId);

    if (!existingLocation) {
      return res.status(404).json({
        success: false,
        message: 'Location not found',
      });
    }

    //! Soft delete the Location
    await Locations.update(
      { isDeleted: true },
      { where: { locationId: locationId } }
    );

    //! Save the changes
    await existingLocation.save();

    res.status(200).json({
      success: true,
      message: 'Location soft deleted successfully',
      product: existingLocation.toJSON(),
    });
  } catch (error) {
    console.error('An error occurred while soft deleting the Location:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while soft deleting the Location',
      error: error.message,
    });
  }
};


//! Get All Locations Start
const getAllLocations = async (req, res) => {
  try {
    //! Retrieve only Locations that haven't been soft deleted
    const locations = await Locations.findAll({
      where: {
        isDeleted: false,
      },
    });

    //! Map through the locations to construct the image_url for each location
    const locationsWithImageUrls = locations.map(location => ({
      ...location.toJSON(),
      image_url: `http://localhost:4000/locationImages/${location.locationImageName}`,
    }));

    res.status(200).json({
      success: true,
      message: "Locations retrieved successfully",
      Locations: locationsWithImageUrls,
    });
  } catch (error) {
    console.error('An error occurred while fetching Locations:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching Locations',
      error: error.message,
    });
  }
}

const getLocationById = async (req, res) => {
  const locationId = req.params.locationId; 
  try {

    //! Check If Location Existing
    const existingLocation = await Locations.findOne({ where: { locationId: locationId } });

    if (!existingLocation) {
      return res.status(404).json({
        success: false,
        message: "Location Not Found",
      });
    } else {
      const image_url = `http://localhost:4000/locationImages/${existingLocation.locationImageName}`;
      const Location = await Locations.findByPk(locationId);

      res.status(200).json({
        success: true,
        message: "Location retrieved successfully",
        Location: {
          ...Location.toJSON(),
          image_url: image_url,
        },
      });
    }
  } catch (error) {
    console.error('An Error Occurred While Fetching Location:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching Location',
      error: error.message,
    });
  }
};

const getByDate = async (req, res) => {
  try {
    const startDate = new Date('2023-01-01');
    const endDate = new Date('2023-12-31');

    // Retrieve only Locations that haven't been soft deleted and created in the year 2023
    const locations = await Locations.findAll({
      where: {
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    // Map through the locations to construct the image_url for each location
    const locationsWithImageUrls = locations.map(location => ({
      ...location.toJSON(),
      image_url: `http://localhost:4000/locationImages/${location.locationImageName}`,
    }));

    res.status(200).json({
      success: true,
      message: "Locations retrieved successfully",
      Locations: locationsWithImageUrls,
    });
  } catch (error) {
    console.error('An error occurred while fetching Locations:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching Locations',
      error: error.message,
    });
  }
};

module.exports = {
  addLocation,
  imageProduct,
  updateLocationById,
  deleteLocationById,
  getAllLocations,
  getLocationById,
  getByDate
}