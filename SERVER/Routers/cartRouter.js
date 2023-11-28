const express = require('express');
const cartController = require('../Controllers/cartController');
const router = express.Router();

router.post('/Add_To_Cart/:productId', cartController.getCartItems);
router.delete('/Delete_From_Cart/:cartItemId', cartController.softDeleteFromCart);
router.put('/Update_From_Cart/:cartItemId', cartController.updateCartItem);
router.get('/Get_Items_According/:userId', cartController.getCartItemsByUserId);
router.get('/Get_All_Items', cartController.getCartItems);

module.exports = router;