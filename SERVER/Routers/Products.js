const express = require('express');
const Router = express.Router();
const Products = require("../Controllers/Products")
const { uploadImg } = require('../Middleware/Firebase');

Router.get('/Get_All_Products_Pagination', Products.getProductsPagination);
Router.get('/Get_Product_By_Id/:productId', Products.getProductById);
Router.get('/Get_All_Products', Products.getAllProducts);
Router.get('/Get_All_Products_For_Home_Page', Products.getAllProductsForHomePage);
Router.post('/Add_New_Product', uploadImg, Products.addProduct);
Router.put('/Update_Product_By_Id/:productId', uploadImg, Products.updateProduct);
Router.delete('/Delete_Product_By_Id/:productId', Products.deleteProduct);
Router.put('/View_The_Product/:productId', Products.viewTheProduct);
Router.put('/Not_View_The_Product/:productId', Products.notViewTheProduct);
Router.get('/Get_Product_Count', Products.getProductCount);

module.exports = Router;