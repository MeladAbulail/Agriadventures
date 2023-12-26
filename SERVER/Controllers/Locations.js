const { Locations, Ratings_And_Reviews_Locations } = require('../Models/Tables');

//! Add New Location Start
const addLocation = async (req, res) => {
  try {
    const { locationName, owner, description, openingHours, price, visitDate, phone, email, location } = req.body;
    const imageUrl = res.locals.site;
    const newLocation = await Locations.create({
      locationName,
      owner,
      description,
      openingHours,
      price,
      imageUrl,
      visitDate,
      phone,
      email,
      location
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
    const locationId = req.params.locationId; 
    const { locationName, description, price } = req.body;

    //! Check if the Location exists
    const existingLocation = await Locations.findByPk(locationId);

    if (!existingLocation) {
      return res.status(404).json({
        message: 'Location not found',
      });
    }

    //! Update the Location details
    existingLocation.locationName = locationName;
    existingLocation.description = description;
    existingLocation.price = price;

    //! Check if a new image is uploaded
    if (req.file) {
      const newImageName = res.locals.site;
      existingLocation.imageUrl = newImageName;
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


//! Soft delete location by ID 
const deleteLocationById = async (req, res) => {
  try {
    const locationId = req.params.locationId; 

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
        isDeleted: false, ViewThePlace: true
      },
      order: [['locationId', 'ASC']],
    });

    res.status(200).json({
      success: true,
      message: "Locations retrieved successfully",
      Locations: locations,

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
    const existingLocation = await Locations.findOne({ 
      where: { locationId: locationId, isDeleted: false, ViewThePlace: true 
      } });
    if (!existingLocation) {
      return res.status(404).json({
        success: false,
        message: "Location Not Found",
      });
    } else {
      const Location = await Locations.findByPk(locationId);

      res.status(200).json({
        success: true,
        message: "Location retrieved successfully",
        Location: Location
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
    // Retrieve only the last 4 Locations that haven't been soft deleted
    const locations = await Locations.findAll({
      where: {
        isDeleted: false, ViewThePlace: true
      },
      order: [['createdAt', 'DESC']], // Order by creation date in descending order
      limit: 4, // Limit the result to the last 4 locations
    });

    res.status(200).json({
      success: true,
      message: "Last 4 locations retrieved successfully",
      Locations: locations,
    });
  } catch (error) {
    console.error('An error occurred while fetching last 4 Locations:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching last 4 Locations',
      error: error.message,
    });
  }
};

//! Get All Locations Accourding ViewThePlace
const getLocationByViewThePlace = async (req, res) => {
  const locations = await Locations.findAll({
    where: {
      ViewThePlace: false, isDeleted: false
    }
  })

  if (!locations) {
    return res.status(404).json({
      success: false,
      message: "Not Locations Found",
    });
  } else {

    res.status(200).json({
      success: true,
      message: "Locations retrieved successfully",
      locations: locations
    });
  }
}

//! Update View The Place
const viewThePlace = async (req, res) => {
  try {
    const locationId = req.params.locationId; 

    //! Check if the location exists
    const Location = await Locations.findByPk(locationId);

    if (!Location) {
      return res.status(404).json({
        success: false,
        message: 'Location not found',
      });
    }

    //! Soft delete the Location
    await Locations.update(
      { ViewThePlace: true },
      { where: { locationId: locationId } }
    );

    //! Save the changes
    await Location.save();

    res.status(200).json({
      success: true,
      message: 'Location soft deleted successfully',
      product: Location.toJSON(),
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



module.exports = {
  addLocation,
  updateLocationById,
  deleteLocationById,
  getAllLocations,
  getLocationById,
  getByDate,
  getLocationByViewThePlace,
  viewThePlace
}