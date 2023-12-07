const express = require("express");
const { authorize } = require('../Middleware/authorization');
// const { upload } = require("../middlewares/MulterMiddlewares");
// const authentication = require('../middlewares/authMiddleware')

const router = express.Router();
const bookController = require("../Controllers/bookController");

router.post("/chargeBook", authorize("user"), bookController.createPayment);
router.get("/payments", bookController.getAllPayments);

router.get("/paymentidUser/:userid", bookController.getPaymentByUserId);
router.get("/paymentid/:payment_id", bookController.getPaymentById);

router.delete("/delete/:payment_id", bookController.deletePayment);


module.exports = router;


