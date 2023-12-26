const express = require('express');
const Router = express.Router();
const Order = require('../Controllers/Order');
const { authorize } = require('../Middleware/Authorization');

Router.get('/Get_All_Orders_PAGINATION', Order.getOrdersPagination);
Router.get('/Get_Order_By_userId', authorize(["User", "Admin"]), Order.getOrdersByUserId);
Router.get('/Get_Order_By_Id/:id', Order.getOrderById);
Router.post('/Add_New_Order', Order.addNewOrder);
Router.put('/Update_Order_Received/:orderId', Order.updateOrderReceived);
Router.put('/Update_Order_Not_Received/:orderId', Order.updateOrderNotReceived);
Router.delete('/Delete_Order/:orderId', Order.deleteOrder);
Router.get('/Get_Orders_Count', Order.getOrdersCount);

module.exports = Router;
