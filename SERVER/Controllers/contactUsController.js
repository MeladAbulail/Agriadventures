const { Contact_us, User } = require('../Models/Tables');

const addNewMessage = async (req, res) => {
  try {
    const { username, email, message } = req.body;

    //! Create a new message and associate it with the user
    const newMessage = await Contact_us.create({
      email,
      message,
      username
    });

    res.status(201).json({ message: 'Message added successfully', data: newMessage });
  } catch (error) {
    console.error('Error adding new message:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getMessageByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const messages = await Contact_us.findAll({
      where: {
        email: email,
        isDeleted: false
      }
    });

    const serializedMessages = messages.map(message => message.toJSON());

    res.status(200).json({
      success: true,
      message: "Messages retrieved successfully",
      messages: serializedMessages
    });
  } catch (error) {
    console.error("Error retrieving messages:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateMessageById = async (req, res) => {
  try {
    // Extract ContactUsId from request parameters
    const contactUsId = req.params.contactUsId;

    // Extract messageCategory and messageStatus from request body
    const { messageCategory, messageStatus } = req.body;

    // Find the existing message by primary key
    const existingMessage = await Contact_us.findByPk(contactUsId);

    // Check if the message exists
    if (!existingMessage) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
      });
    }

    // Update the message details
    existingMessage.messageCategory = messageCategory;
    existingMessage.messageStatus = messageStatus;

    // Save the changes to the database
    await existingMessage.save();

    // Respond with success message and updated message details
    res.status(200).json({
      success: true,
      message: 'Message updated successfully',
      Location: existingMessage.toJSON(),
    });

  } catch(error) {
    // Log the error for debugging purposes
    console.error("Error updating message:", error);

    // Respond with an error message
    res.status(500).json({
      success: false,
      message: 'An error occurred while updating the message',
      error: error.message,
    });
  }
};

//! Soft delete Message by Id 
const deleteMessageById = async (req, res) => {
  try {
    const contactUsId = req.params.contactUsId

    //! Check if the Message exists
    const existingMessage = await Contact_us.findByPk(contactUsId)

    if (!existingMessage) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
      });
    }

    //! Soft delete the Message
    await Contact_us.update(
      { isDeleted: true },
      {
        where: { contactUsId: contactUsId },
      }
    );

    //! Save the changes
    await existingMessage.save();

    res.status(200).json({
      success: true,
      message: 'Message soft deleted successfully',
      Message: existingMessage.toJSON(),
    });

  } catch (error) {
    console.error('An error occurred while soft deleting the Message:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while soft deleting the Message',
      error: error.message,
    });
  }
}

const getAllMessages = async (req, res) => {
  try {
    const messages = await Contact_us.findAll({
      where: {
        isDeleted: false
      }
    });

    const serializedMessages = messages.map(message => message.toJSON());

    res.status(200).json({
      success: true,
      message: "Messages retrieved successfully",
      messages: serializedMessages
    });

  } catch(error) {
    console.error("")
    res.status(500).json({
      success: false,
      Message: "An error occurred while updating the message",
      error: error.message,
    })
  }
}

module.exports = {
  addNewMessage,
  getMessageByEmail,
  updateMessageById,
  deleteMessageById,
  getAllMessages
};
