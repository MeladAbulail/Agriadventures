const User = require("../Controllers/User")
const express = require('express');
const { authorize } = require('../Middleware/Authorization');
const { uploadImg } = require('../Middleware/Firebase');
const CheckBanStatus = require('../Middleware/CheckBanStatus');
const Router = express.Router();

Router.post("/Register", User.registerUser)
Router.post("/Login", User.loginUser)
Router.post("/Login_Admin", User.loginAdmin)
Router.get("/Get_All_Users_PAGINATION", User.getUsersPagination);
Router.get("/Get_All_Users", User.getAllUsers)
Router.get("/Get_Admin_Users", User.getAdminUsers)
Router.get("/Get_User_By_Id", authorize(["User", "Admin"]), User.getUserById)
Router.put("/Update_User_By_Id", authorize(["User", "Admin"]), uploadImg, User.updateUserById)
Router.delete("/Delete_User_By_Id/:userId", User.deleteUserById)
Router.put("/Ban_User_By_Id/:userId", User.banUserById);
Router.put('/UnBan_User_By_Id/:userId', User.unbanUserController);
Router.put('/Make_User_Admin/:userId', User.makeUserAdmin);
Router.put('/Make_Admin_User/:userId', User.makeAdminUser);
Router.get('/Get_Users_Count', User.getUsersCount);

module.exports = Router;