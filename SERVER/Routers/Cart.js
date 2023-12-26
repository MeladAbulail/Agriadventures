const express = require('express');
const Cart = require('../Controllers/Cart');
const { authorize } = require('../Middleware/Authorization');
const Router = express.Router();

Router.post('/Add_To_Cart', authorize(["User", "Admin"]), Cart.addProductToCart);
Router.delete('/Delete_From_Cart/:cartId', Cart.softDeleteFromCart);
Router.delete('/Delete_All_By_UserId', authorize(["User", "Admin"]), Cart.softDeleteFromCartByUserId);
Router.put('/Update_From_Cart/:cartId', Cart.updateCartItem);
Router.get('/Get_Items_According_UserId', authorize(["User", "Admin"]), Cart.getCartItemsByUserId);
Router.get('/Get_All_Items', Cart.getCartItems);

module.exports = Router;