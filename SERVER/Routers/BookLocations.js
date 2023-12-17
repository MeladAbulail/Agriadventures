const express = require("express");
const { authorize } = require('../Middleware/Authorization');
const Router = express.Router();
const Book = require("../Controllers/Book");

Router.post("/chargeBook", authorize(["user", "Admin"]), Book.createPayment);
Router.get("/payments", Book.getAllPayments);
Router.get("/paymentidUser/:userid", Book.getPaymentByUserId);
Router.get("/paymentid/:payment_id", Book.getPaymentById);
Router.delete("/delete/:payment_id", Book.deletePayment);

module.exports = Router;


