const { Router } = require("express");
const userController = require("../Controllers/userController")
const router = Router();

router.post("/Register", userController.registerUser)
router.post("/Login", userController.loginUser)

router.get("/Get_All_Users", userController.getAllUsers)
router.get("/Get_User_By_Id/:userId", userController.getUserById)
router.put("/Update_User_By_Id/:userId", userController.imageUser, userController.updateUserById)
router.delete("/Delete_User_By_Id/:userId", userController.deleteUserById)

module.exports = router;