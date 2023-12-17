const express = require('express');
const Router = express.Router();
const Order = require('../Controllers/Order');
const { authorize } = require('../Middleware/Authorization');

Router.get('/Get_All_Orders', Order.getAllOrders);
Router.get('/Get_Order_By_userId', authorize(["user", "Admin"]), Order.getOrdersByUserId);
Router.get('/Get_Order_By_Id/:id', Order.getOrderById);
Router.post('/Add_New_Order', Order.addNewOrder);
Router.put('/Update_Order/:id', Order.updateOrder);
Router.delete('/Delete_Order/:id', Order.deleteOrder);

module.exports = Router;
