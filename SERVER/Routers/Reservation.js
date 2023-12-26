const express = require('express');
const Router = express.Router();
const Reservation = require('../Controllers/Reservation');
const { authorize } = require('../Middleware/Authorization');

Router.get('/Get_All_Reservations_PAGINATION', Reservation.getReservationsPagination);
Router.get('/Get_Reservations_By_UserId', authorize(["User", "Admin"]), Reservation.getReservationByUserId);
Router.post('/Add_New_Reservations', Reservation.addReservation);
Router.put('/Update_Reservations_Complete/:reservationId', Reservation.updateReservationComplete);
Router.put('/Update_Reservations_In_Complete/:reservationId', Reservation.updateReservationInComplete);
Router.delete('/Delete_Reservations/:reservationId', Reservation.deleteReservation);
Router.get('/Get_Reservations_Count', Reservation.getReservationsCount);

module.exports = Router;
