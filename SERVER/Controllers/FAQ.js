const { FAQ } = require('../Models/Tables');

//! Add New FAQ 
const addFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const newFAQ = await FAQ.create({
      question,
      answer
    });

    res.status(201).json({
      success: true,
      message: 'FAQ added successfully',
      FAQ: newFAQ.toJSON(),
    });
  } catch (error) {
    console.error('An error occurred while adding the newFAQ:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while adding the newFAQ',
      error: error.message,
    });
  }
};

//! Get All FQA Pagination
const getFAQPagination = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const itemsPerPage = req.query.itemsPerPage || 5;
    const allFAQ = await FAQ.findAll({
      where: {
        isDeleted: false,
      },
      order: [['faqId', 'ASC']],
    });

    const fAQ = await FAQ.findAndCountAll({
      where: {
        isDeleted: false,
      },
      limit: itemsPerPage,
      offset: (page - 1) * itemsPerPage,
      order: [['createdAt', 'ASC']],
    });

    const totalPages = Math.ceil(fAQ.count / itemsPerPage);

    res.status(200).json({
      success: true,
      message: 'FAQ retrieved successfully',
      fqa: fAQ.rows,
      totalFqa: fAQ.count,
      totalPages,
      currentPage: page,
      allFAQ: allFAQ
    });
  } catch (error) {
    console.error('An error occurred while fetching FAQ:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching FAQ',
      error: error.message,
    });
  }
};

//! Update FAQ by ID 
const updateFAQById = async (req, res) => {
  try {
    const faqId = req.params.faqId; 
    const { question, answer } = req.body;

    //! Check if the FAQ exists
    const existingFaq = await FAQ.findByPk(faqId);

    if (!existingFaq) {
      return res.status(404).json({
        message: 'FAQ not found',
      });
    }

    //! Update the FAQ details
    if(existingFaq.question) {
      existingFaq.question = question;
    }

    if(existingFaq.answer) {
      existingFaq.answer = answer;
    }

    //! Save the changes
    await existingFaq.save();

    res.status(200).json({
      success: true,
      message: 'FAQ updated successfully',
      FAQ: existingFaq.toJSON(),
    });
  } catch (error) {
    console.error('An error occurred while updating the FAQ:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while updating the FAQ',
      error: error.message,
    });
  }
};

//! Soft delete FAQ by ID 
const deleteFAQById = async (req, res) => {
  try {
    const faqId = req.params.faqId; 

    //! Check if the faq exists
    const existingFaq = await FAQ.findByPk(faqId);

    if (!existingFaq) {
      return res.status(404).json({
        success: false,
        message: 'FAQ not found',
      });
    }

    //! Soft delete the FAQ
    await FAQ.update(
      { isDeleted: true },
      { where: { faqId: faqId } }
    );

    //! Save the changes
    await existingFaq.save();

    res.status(200).json({
      success: true,
      message: 'FAQ soft deleted successfully',
      FAQ: existingFaq.toJSON(),
    });
  } catch (error) {
    console.error('An error occurred while soft deleting the FAQ:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while soft deleting the FAQ',
      error: error.message,
    });
  }
};

module.exports = {
  addFAQ,
  getFAQPagination,
  updateFAQById,
  deleteFAQById
};