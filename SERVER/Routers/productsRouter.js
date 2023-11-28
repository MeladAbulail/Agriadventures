const { Router } = require("express");
const productsController = require("../Controllers/productsController")
const router = Router();

router.get('/Get_All_Products', productsController.getProducts);
router.get('/Get_Product_By_Id/:productId', productsController.getProductById);
router.post('/Add_New_Product', productsController.imageProduct, productsController.addProduct);
router.put('/Update_Product_By_Id/:productId', productsController.imageProduct, productsController.updateProduct);
router.delete('/Delete_Product_By_Id/:productId', productsController.deleteProduct);

module.exports = router;