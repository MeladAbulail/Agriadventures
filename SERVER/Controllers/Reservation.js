const { Reservation } = require('../Models/Tables');

const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.findAll();
    res.json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
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

const updateReservation = async (req, res) => {
  const reservationId = req.params.id;

  // Assuming the request body contains the updated data
  const updatedData = req.body;

  try {
    const reservation = await Reservation.findByPk(reservationId);

    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    await reservation.update(updatedData);

    res.json(reservation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteReservation = async (req, res) => {
  const reservationId = req.params.id;

  try {
    const reservation = await Reservation.findByPk(reservationId);

    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    await reservation.destroy();
    res.json({ message: 'Reservation deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllReservations,
  getReservationByUserId,
  addReservation,
  updateReservation,
  deleteReservation,
};
