const express = require('express');
const Router = express.Router();
const Reservation = require('../Controllers/Reservation');
const { authorize } = require('../Middleware/Authorization');

Router.get('/Get_All_Reservations', Reservation.getAllReservations);
Router.get('/Get_Reservations_By_UserId', authorize(["user", "Admin"]), Reservation.getReservationByUserId);
Router.post('/Add_New_Reservations', Reservation.addReservation);
Router.put('/Update_Reservations/:id', Reservation.updateReservation);
Router.delete('/Delete_Reservations/:id', Reservation.deleteReservation);

module.exports = Router;
