const { Router } = require('express');
const contactUsController = require('../Controllers/contactUsController');
const router = Router();

router.post("/Add_New_Message", contactUsController.addNewMessage);
router.get('/Get_All_Message_By_email/:email', contactUsController.getMessageByEmail);
router.get('/Get_All_Messages', contactUsController.getAllMessages);
router.put('/Update_Message_By_Id/:contactUsId', contactUsController.updateMessageById);
router.delete('/Delete_By_Id/:contactUsId', contactUsController.deleteMessageById);

module.exports = router;