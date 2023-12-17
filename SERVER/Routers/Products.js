const express = require('express');
const Router = express.Router();
const Products = require("../Controllers/Products")
const { uploadImg } = require('../Middleware/Firebase');

Router.get('/Get_All_Products', Products.getProducts);
Router.get('/Get_Product_By_Id/:productId', Products.getProductById);
Router.get('/Get_Products_By_ViewThePlace', Products.getProductsByViewThePlace);
Router.post('/Add_New_Product', uploadImg, Products.addProduct);
Router.put('/Update_Product_By_Id/:productId', uploadImg, Products.updateProduct);
Router.delete('/Delete_Product_By_Id/:productId', Products.deleteProduct);
Router.put('/View_The_Product/:productId', Products.viewTheProduct);

module.exports = Router;