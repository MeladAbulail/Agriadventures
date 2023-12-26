const express = require('express');
const Router = express.Router();
const ContactUs = require('../Controllers/ContactUs');

Router.post("/Add_New_Message", ContactUs.addNewMessage);
Router.get('/Get_All_Message_By_email/:email', ContactUs.getMessageByEmail);
Router.get('/Get_All_Messages_PAGINATION', ContactUs.messagesPagination);
Router.put('/Update_Message_By_Id/:contactUsId', ContactUs.updateMessageById);
Router.delete('/Delete_By_Id/:contactUsId', ContactUs.deleteMessageById);
Router.put('/Update_Message_Readability/:contactUsId', ContactUs.updateMessageReadability);
Router.put('/Update_Message_Not_Readability/:contactUsId', ContactUs.updateMessageNotReadability);
Router.get('/Get_ContactUs_Count', ContactUs.getContactUsCount);

module.exports = Router;