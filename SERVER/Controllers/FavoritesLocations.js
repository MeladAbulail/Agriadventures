const { FavoritesLocations, Locations } = require('../Models/Tables');

//! Add New Favorites Locations 
const addFavoritesLocations = async (req, res) => {
  try {
    const userId = req.user.userId;
    const locationId = req.params.locationId; 

    if (!userId) {
      return res.status(401).json({ success: false, message: "You must log in first" });
    }

    const checkFavorityExistButMakeSoftDelete = await FavoritesLocations.findOne({
      where: {
        userId: userId, locationId: locationId
      }
    })

    if(checkFavorityExistButMakeSoftDelete) {
      await FavoritesLocations.update(
        { isDeleted: false },
        { where: { userId: userId, locationId: locationId } }
      );
    } else {
      const newFavoritesLocation = await FavoritesLocations.create({
        userId,
        locationId,
      });
      res.status(201).json({
        success: true,
        message: 'Favorites Locations added successfully',
        FavoritesLocations: newFavoritesLocation.toJSON(),
      });
    }

  } catch (error) {
    console.error('An error occurred while adding the Favorites Locations:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while adding the Locations',
      error: error.message,
    });
  }
};

//! Get Favorites Locations By User Id
const getFavoritesLocationsByUserId = async (req, res) => {
  const userId = req.user.userId;

  try {
    const userFavoritesLocations = await FavoritesLocations.findAll({
      where: {
        userId: userId,
        isDeleted: false,
      },
    });

    if (userFavoritesLocations.length === 0) {
      return res.status(404).json({ error: 'No Favorites Locations found for the specified userId' });
    }

    const locations = await Promise.all(
      userFavoritesLocations.map(async (location) => {
        const locationData = await Locations.findByPk(location.locationId);
        return locationData;
      })
    );

    res.status(200).json(locations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


//! Get Favorites Locations By Location Id
const getFavoritesLocationsByLocationId = async (req, res) => {
  const userId = req.user.userId;
  const locationId = req.params.locationId

  try {
    const userFavoritesLocations = await FavoritesLocations.findAll({
      where: {
        userId: userId, locationId: locationId, isDeleted: false
      },
    });

    res.status(200).json(
      userFavoritesLocations
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//! Soft delete Favorites Locations by ID 
const deleteFavoritesLocation = async (req, res) => {
  try {
    const userId = req.user.userId;
    const locationId = req.params.locationId; 

    //! Check if the favorites ProductsId exists
    const existingFavoritesLocations = await FavoritesLocations.findOne({
      where: {
        userId: userId, locationId: locationId
      }
    });

    if (!existingFavoritesLocations) {
      return res.status(404).json({
        success: false,
        message: 'favorites LocationsId not found',
      });
    }

    //! Soft delete the Favorites Locations
    await FavoritesLocations.update(
      { isDeleted: true },
      { where: { userId: userId, locationId: locationId } }
    );

    //! Save the changes
    await existingFavoritesLocations.save();

    res.status(200).json({
      success: true,
      message: 'Favorites Locations soft deleted successfully',
      FavoritesLocations: existingFavoritesLocations.toJSON(),
    });
  } catch (error) {
    console.error('An error occurred while soft deleting the Favorites Locations:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while soft deleting the Favorites Locations',
      error: error.message,
    });
  }
};

module.exports = {
  addFavoritesLocations,
  getFavoritesLocationsByUserId,
  deleteFavoritesLocation,
  getFavoritesLocationsByLocationId
};