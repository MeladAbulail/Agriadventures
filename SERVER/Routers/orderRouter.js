const express = require('express');
const router = express.Router();
const ordersController = require('../Controllers/orderController');
const { authorize } = require('../Middleware/authorization');

router.get('/Get_All_Orders', ordersController.getAllOrders);
router.get('/Get_Order_By_userId', authorize("user"), ordersController.getOrdersByUserId);
router.get('/Get_Order_By_Id/:id', ordersController.getOrderById);
router.post('/Add_New_Order', ordersController.addNewOrder);
router.put('/Update_Order/:id', ordersController.updateOrder);
router.delete('/Delete_Order/:id', ordersController.deleteOrder);

module.exports = router;
