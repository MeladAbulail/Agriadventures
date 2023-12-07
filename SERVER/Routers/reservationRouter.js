const express = require('express');
const router = express.Router();
const reservationController = require('../Controllers/reservationController');
const { authorize } = require('../Middleware/authorization');

router.get('/Get_All_Reservations', reservationController.getAllReservations);
router.get('/Get_Reservations_By_UserId', authorize("user"), reservationController.getReservationByUserId);
router.post('/Add_New_Reservations', reservationController.addReservation);
router.put('/Update_Reservations/:id', reservationController.updateReservation);
router.delete('/Delete_Reservations/:id', reservationController.deleteReservation);

module.exports = router;
