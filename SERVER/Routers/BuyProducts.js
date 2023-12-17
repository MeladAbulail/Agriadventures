const express = require("express");
const { authorize } = require('../Middleware/Authorization');
const Router = express.Router();
const BuyProduct = require("../Controllers/BuyProduct");

Router.post("/charge", authorize(["user", "Admin"]), BuyProduct.createPayment);
Router.get("/payments", BuyProduct.getAllPayments);
Router.get("/paymentidUser/:userid", BuyProduct.getPaymentByUserId);
Router.get("/paymentid/:payment_id", BuyProduct.getPaymentById);
Router.delete("/delete/:payment_id", BuyProduct.deletePayment);

module.exports = Router;


