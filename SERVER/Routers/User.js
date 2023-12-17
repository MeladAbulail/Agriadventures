const User = require("../Controllers/User")
const express = require('express');
const { authorize } = require('../Middleware/Authorization');
const { uploadImg } = require('../Middleware/Firebase');
const Router = express.Router();

Router.post("/Register", User.registerUser)
Router.post("/Login", User.loginUser)
Router.post("/Login_Admin", User.loginAdmin)
Router.get("/Get_All_Users_PAGINATION", User.getAllUsersPagination);
Router.get("/Get_All_Users", User.getAllUsers)
Router.get("/Get_Admin_Users", User.getAdminUsers)
Router.get("/Get_User_By_Id", authorize(["user", "Admin"]), User.getUserById)
Router.put("/Update_User_By_Id", authorize(["user", "Admin"]), uploadImg, User.updateUserById)
Router.delete("/Delete_User_By_Id/:userId", User.deleteUserById)

module.exports = Router;