const express = require('express');
const FAQ = require('../Controllers/FAQ');
const Router = express.Router();

Router.get('/Get_All_FAQ_PAGINATION', FAQ.getFAQPagination);
Router.post('/Add_New_FAQ', FAQ.addFAQ);
Router.put('/Update_FAQ/:faqId', FAQ.updateFAQById);
Router.delete('/Delete_FAQ/:faqId', FAQ.deleteFAQById);

module.exports = Router;