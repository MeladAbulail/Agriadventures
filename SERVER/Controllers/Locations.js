const { Locations, Ratings_And_Reviews_Locations } = require('../Models/Tables');

//! Add New Location Start
const addLocation = async (req, res) => {
  try {
    console.log('Received data:', req.body);

    const {
      locationName,
      owner,
      workdays,
      description,
      TicketPricePerPerson,
      phone,
      email,
      location,
      TheBeginningAndEndOfTheJourney
    } = req.body;

    const timeObject = JSON.parse(TheBeginningAndEndOfTheJourney);

    const newLocation = await Locations.create({
      locationName,
      owner,
      description,
      TicketPricePerPerson,
      imageUrl: res.locals.site,
      phone,
      email,
      location,
      workdays: Array.isArray(workdays) ? workdays.join(',') : workdays, 
      TheBeginningAndEndOfTheJourney: timeObject
    });

    res.status(201).json({
      success: true,
      message: 'Location added successfully',
      location: newLocation.toJSON(),
    });
  } catch (error) {
    console.error('An error occurred while adding the Location:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while adding the Location',
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

    //! Update the Location details dynamically
    if (locationName !== undefined) {
      existingLocation.locationName = locationName;
    }

    if (description !== undefined) {
      existingLocation.description = description;
    }

    if (price !== undefined) {
      existingLocation.price = price;
    }

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

//! Get All Locations Pagination
const getAllLocationsPagination = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const itemsPerPage = req.query.itemsPerPage || 5;

    const locations = await Locations.findAll({
      where: {
        isDeleted: false,
      },
      order: [['createdAt', 'ASC']],
      limit: itemsPerPage,
      offset: (page - 1) * itemsPerPage,
    });

    const totalItems = await Locations.count({
      where: {
        isDeleted: false,
        ViewThePlace: true,
      },
    });

    const locationsConfirm = await Locations.findAll({
      where: {
        isDeleted: false,
        ViewThePlace: true,
      },
      order: [['createdAt', 'ASC']],
    });

    const totalPages = Math.ceil(locations.count / itemsPerPage);

    res.status(200).json({
      success: true,
      message: "Locations retrieved successfully",
      Locations: locations,
      totalItems: totalItems, 
      locations: locations.rows,
      totalLocations: locations.count,
      totalPages,
      currentPage: page,
      locationsConfirm: locationsConfirm.map(locationsConfirm => locationsConfirm.locationId),
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
    
    const locations = await Locations.findAll({
      where: {
        isDeleted: false, ViewThePlace: true
      },
      order: [['createdAt', 'DESC']], 
      limit: 4, 
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
const getAllLocations = async (req, res) => {
  try {
    const locations = await Locations.findAll({
      where: {
        isDeleted: false,
      },
      order: [['createdAt', 'ASC']],
    });

    const locationsConfirm = await Locations.findAll({
      where: {
        isDeleted: false,
        ViewThePlace: true,
      },
      order: [['createdAt', 'ASC']],
    });

    if (!locations || locations.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Locations Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Locations retrieved successfully",
      locations: locations,
      locationsConfirm: locationsConfirm.map((location) => location.locationId),
    });
  } catch (error) {
    console.error("Error retrieving locations:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//! Get All Locations For Home Page
const getAllLocationsForHomePage = async (req, res) => {
  try {
    const locations = await Locations.findAll({
      where: {
        isDeleted: false, ViewThePlace: true
      },
      order: [['createdAt', 'ASC']],
    });

    if (!locations || locations.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Locations Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Locations retrieved successfully",
      locations: locations,
    });
  } catch (error) {
    console.error("Error retrieving locations:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


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

//! Not Update View The Place
const notViewThePlace = async (req, res) => {
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
      { ViewThePlace: false },
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

//! Get Location Count
const getLocationCount = async (req, res) => {
  try {
    const alllocationsCount = await Locations.count({
      where: {
        isDeleted: false,
        ViewThePlace: true,
      },
    });

    const locationsAwaitingApprovalCount = await Locations.count({ 
      where: {
        isDeleted: false,
        ViewThePlace: false,
      },
    });

    const locationsZarqaCount = await Locations.count({
      where: {
        isDeleted: false,
        ViewThePlace: true,
        location: "Zarqa"
      },
    });

    const locationsAmmanCount = await Locations.count({
      where: {
        isDeleted: false,
        ViewThePlace: true,
        location: "Amman"
      },
    });

    const locationsAqabaCount = await Locations.count({
      where: {
        isDeleted: false,
        ViewThePlace: true,
        location: "Aqaba"
      },
    });

    const locationsAjlounCount = await Locations.count({
      where: {
        isDeleted: false,
        ViewThePlace: true,
        location: "Ajloun"
      },
    });

    const locationsMadabaCount = await Locations.count({
      where: {
        isDeleted: false,
        ViewThePlace: true,
        location: "Madaba"
      },
    });

    const locationsIrbidCount = await Locations.count({
      where: {
        isDeleted: false,
        ViewThePlace: true,
        location: "Irbid"
      },
    });

    res.status(200).json({
      success: true,
      message: 'Location count retrieved successfully',
      alllocationsCount,
      locationsAwaitingApprovalCount,
      locationsZarqaCount,
      locationsAmmanCount,
      locationsAqabaCount,
      locationsAjlounCount,
      locationsMadabaCount,
      locationsIrbidCount,
    });
  } catch (error) {
    console.error('An error occurred while fetching Location count:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching Location count',
      error: error.message,
    });
  }
};

module.exports = {
  addLocation,
  updateLocationById,
  deleteLocationById,
  getAllLocationsPagination,
  getLocationById,
  getByDate,
  getAllLocations,
  viewThePlace,
  getLocationCount,
  notViewThePlace,
  getAllLocationsForHomePage
}