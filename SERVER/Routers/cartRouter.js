const express = require('express');
const cartController = require('../Controllers/cartController');
const { authorize } = require('../Middleware/authorization');
const router = express.Router();

router.post('/Add_To_Cart', authorize("user"), cartController.addProductToCart);
router.delete('/Delete_From_Cart/:cartId', cartController.softDeleteFromCart);
router.delete('/Delete_All_By_UserId', authorize("user"), cartController.softDeleteFromCartByUserId);
router.put('/Update_From_Cart/:cartId', cartController.updateCartItem);
router.get('/Get_Items_According_UserId', authorize("user"), cartController.getCartItemsByUserId);
router.get('/Get_All_Items', cartController.getCartItems);

module.exports = router;