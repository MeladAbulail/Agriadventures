const { Router } = require("express");
const userController = require("../Controllers/userController")
const { authorize } = require('../Middleware/authorization');
const { uploadImg } = require('../Middleware/firebase');
const router = Router();

router.post("/Register", userController.registerUser)
router.post("/Login", userController.loginUser)
router.get("/Get_All_Users", userController.getAllUsers)
router.get("/Get_Admin_Users", userController.getAdminUsers)
router.get("/Get_User_By_Id", authorize("user"), userController.getUserById)
router.put("/Update_User_By_Id", authorize("user"), uploadImg, userController.updateUserById)
router.delete("/Delete_User_By_Id/:userId", userController.deleteUserById)

module.exports = router;