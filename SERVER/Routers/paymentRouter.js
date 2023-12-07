const express = require("express");
const { authorize } = require('../Middleware/authorization');
// const { upload } = require("../middlewares/MulterMiddlewares");
// const authentication = require('../middlewares/authMiddleware')

const router = express.Router();
const paymentsController = require("../Controllers/paymentController");

router.post("/charge", authorize("user"), paymentsController.createPayment);
router.get("/payments", paymentsController.getAllPayments);

router.get("/paymentidUser/:userid", paymentsController.getPaymentByUserId);
router.get("/paymentid/:payment_id", paymentsController.getPaymentById);

router.delete("/delete/:payment_id", paymentsController.deletePayment);


module.exports = router;


