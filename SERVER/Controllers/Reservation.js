const { Reservation } = require('../Models/Tables');

//! Get All Orders Pagination
const getReservationsPagination = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const itemsPerPage = req.query.itemsPerPage || 5;

    const reservations = await Reservation.findAndCountAll({
      where: {
        isDeleted: false,
      },
      limit: itemsPerPage,
      offset: (page - 1) * itemsPerPage,
      order: [['createdAt', 'ASC']],
    });

    const reservationsComplete = await Reservation.findAll({
      where: {
        isDeleted: false,
        completeOrIncomplete: true
      }
    }); 

    const totalPages = Math.ceil(reservations.count / itemsPerPage);

    res.status(200).json({
      success: true,
      message: 'Reservations retrieved successfully',
      reservations: reservations.rows,
      totalreservations: reservations.count,
      totalPages,
      currentPage: page,
      reservationsComplete: reservationsComplete.map(reservation => reservation.reservationId),
    });
  } catch (error) {
    console.error('An error occurred while fetching Reservations:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching Reservations',
      error: error.message,
    });
  }
};

const getReservationByUserId = async (req, res) => {
  const userId = req.user.userId;

  try {
    const reservation = await Reservation.findAll({
      where: { userId: userId, isDeleted: false },
      order: [['reservationId', 'ASC']],
    });

    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    res.json(reservation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addReservation = async (req, res) => {
  // Assuming the request body contains the necessary data for a new reservation
  const {
    userId,
    locationId,
    reservationDate,
    visitDate,
    numberOfVisitors,
    reservationDetails,
    reservationStatus,
    paymentInformation,
    price,
    paymentMethod,
    contactInformation,
    phone,
    additionalComments,
  } = req.body;

  try {
    const newReservation = await Reservation.create({
      userId,
      locationId,
      reservationDate,
      visitDate,
      numberOfVisitors,
      reservationDetails,
      reservationStatus,
      paymentInformation,
      price,
      paymentMethod,
      contactInformation,
      phone,
      additionalComments,
    });

    res.status(201).json(newReservation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateReservationComplete = async (req, res) => {
  try {
    const { reservationId } = req.params;
    const existingReservation = await Reservation.findByPk(reservationId);
    if (!existingReservation) {
      return res.status(404).json({
        success: false,
        message: 'Reservation not found',
      });
    }
    existingReservation.completeOrIncomplete = true;
    await existingReservation.save();
    res.status(200).json({
      success: true,
      message: 'Reservation Complete updated successfully',
      Message: existingReservation.toJSON(),
    });
  } catch (error) {
    console.error('Error updating Reservation Complete:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while updating the Reservation Complete',
      error: error.message,
    });
  }
};

const updateReservationInComplete = async (req, res) => {
  try {
    const { reservationId } = req.params;
    const existingReservation = await Reservation.findByPk(reservationId);
    if (!existingReservation) {
      return res.status(404).json({
        success: false,
        message: 'Reservation not found',
      });
    }
    existingReservation.completeOrIncomplete = false;
    await existingReservation.save();
    res.status(200).json({
      success: true,
      message: 'Reservation Complete updated successfully',
      Message: existingReservation.toJSON(),
    });
  } catch (error) {
    console.error('Error updating Reservation Complete:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while updating the Reservation Complete',
      error: error.message,
    });
  }
};

const deleteReservation = async (req, res) => {
  const reservationId = req.params.reservationId;

  try {
    const reservation = await Reservation.findByPk(reservationId);

    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    await reservation.update({ isDeleted: true });
    
    res.json({ message: 'Reservation soft deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//! Get Reservations Count
const getReservationsCount = async (req, res) => {
  try {

    const allReservationsCount = await Reservation.count({
      where: {
        isDeleted: false,
      },
    });

    const completeReservationsCount = await Reservation.count({
      where: {
        isDeleted: false,
        completeOrIncomplete: true
      },
    });

    const IncompleteReservationsCount = await Reservation.count({
      where: {
        isDeleted: false,
        completeOrIncomplete: false
      },
    });

    res.status(200).json({
      success: true,
      message: 'Reservations Count retrieved successfully',
      allReservationsCount,
      completeReservationsCount,
      IncompleteReservationsCount
    });
  } catch (error) {
    console.error('An error occurred while fetching Reservations Count:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching Reservations Count',
      error: error.message,
    });
  }
};


module.exports = {
  getReservationsPagination,
  getReservationByUserId,
  addReservation,
  updateReservationComplete,
  updateReservationInComplete,
  deleteReservation,
  getReservationsCount
};
