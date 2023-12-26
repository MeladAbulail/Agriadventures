require("dotenv").config();
const { Reservation } = require('../Models/Tables');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const getAllPayments = async (req, res) => {
  try {
    const result = await Reservation.findAll();
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getPaymentByUserId = async (req, res) => {
  const userId = req.params.userId;
  try {
    const result = await Reservation.findAll({
      where: { userId: userId },
    });
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getPaymentById = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const result = await Reservation.findByPk(orderId);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createPayment = async (req, res) => {
  const userId = req.user.userId;
  const {
    cardholder,
    country,
    state,
    address,
    email,
    phone,
    paymentMethodId,
    price,
    locationId,
    numberOfVisitors,
    locationName
  } = req.body;

  try {
    const amountInCents = Math.round(price * 100);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'USD',
      payment_method: paymentMethodId,
      confirm: true,
      description: 'Payment for Product',
      return_url: 'https://yourwebsite.com/success', // Add your success URL here
    });
      
    // Create the payment record in the database
    const newPayment = await Reservation.create({
      cardholder,
      country,
      state,
      address,
      email,
      phone,
      price,
      userId,
      locationId,
      numberOfVisitors,
      locationName
    });

    return res.status(201).json({
      clientSecret: paymentIntent.client_secret,
      payment: newPayment,
    });
  } catch (error) {
    console.error('Error creating payment:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deletePayment = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const result = await Payment.destroy({
      where: { orderId: orderId },
    });
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllPayments,
  getPaymentByUserId,
  getPaymentById,
  createPayment,
  deletePayment,
};
