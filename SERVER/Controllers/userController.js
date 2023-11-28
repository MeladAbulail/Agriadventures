const jwt = require("jsonwebtoken");
const joi = require("joi");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { User } = require("../Models/Tables");
const multer = require("multer");
const path = require("path");

//! Storage Image By Multer Start
let lastFileSequence = 0;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "profileImages");
  },
  filename: (req, file, cb) => {
    lastFileSequence++;
    const newFileName = `${Date.now()}_${lastFileSequence}${path.extname(file.originalname)}`;
    cb(null, newFileName);
  }
});

const addImage = multer({ storage: storage });
const imageUser = addImage.single("image");

//! Create A New User (Registration)
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, gender } = req.body
    //! Validate user input
    const userSchema = joi.object({
      firstName: joi.string().required().min(3).max(15),
      lastName: joi.string().required().min(3).max(15),
      email: joi.string().email().required(),
      password: joi.string().min(6).max(20),
      gender: joi.string().valid("male", "female").insensitive().required()
    });

    const { error } = userSchema.validate(req.body);

    if (error) {
      console.error("Validation error:", error);
      return res.status(400).json({ error: "Invalid input." });
    }

    //! Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const existingUser = await User.findOne({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Email is already in use.' });
    }

    //! Create a new user
    const newUser = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      gender: gender,
    });
    
    if (newUser.error) {
      return res.status(400).json({ 
        succes: false,
        message: "Failed To Create A New User",
        error: newUser.error
      });
    }

    //! Prepare payload for JWT
    const payload = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      gender: req.body.gender,
      userId: newUser.userId, 
      userRole: newUser.userRole,
    };

    //! Generate JWT token
    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

    res.json({
      success: true,
      message: "User has been registered successfully.",
      token: token,
    });
  } catch (error) {
    console.error("An error occurred during the registration process:", error);
    res.status(500).json({ error: "An error occurred during the registration process." });
  }
};

//! Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    //! Validate user input
    const userSchema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().min(5).max(20),
    })

    const { error } = userSchema.validate(req.body);
    if (error) {
      console.error("Validation error:", error);
      return res.status(400).json({ error: "Invalid input." });
    }

    const user = await User.findOne({
      where: { email: email },
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const payload = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      user_type: user.user_type,
      user_id: user.user_id,
    };

    // Generate JWT token
    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login successful.',
      token: token,
    });

  } catch(error) {
    console.error('An error occurred during the login process:', error);
    res.status(500).json({ error: 'An error occurred during the login process.' });
  }
}

//! Controllers For Users
//! Get All Users
const getAllUsers = async (req, res) => {
  try {

    const users = await User.findAll({
      where: {
        isDeleted: false
      }
    })
  
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      users: users.map((user) => user.toJSON())
    })
    
  } catch(error) {
    console.error("An error occurred while fetching Users:")
    res.status(500).json({
      succes: false,
      message: "An error occurred while fetching Users",
      error: error.message
    })
  }
}

//! Get User By Id 
const getUserById = async (req, res) => {
  const userId = req.params.userId; 
  try {

    //! Check If User Existing
    const existingUser = await User.findOne({ where: { userId: userId } });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    } else {
      const user = await User.findByPk(userId);
      res.status(200).json({
        success: true,
        message: "User retrieved successfully",
        user: user.toJSON(),
      });
    }
  } catch (error) {
    console.error('An Error Occurred While Fetching User:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching User',
      error: error.message,
    });
  }
};

//! Update User According UserId
const updateUserById = async (req, res) => {
  const userId = req.params.userId 
  const { firstName, lastName, gender, password} = req.body

  //! Validate user input
  const userSchema = joi.object({
    firstName: joi.string().required().min(3).max(15),
    lastName: joi.string().required().min(3).max(15),
    password: joi.string().min(5).max(20),
    gender: joi.string().valid("male", "female").insensitive().required(),
  });

  const { error } = userSchema.validate(req.body);

  if (error) {
    console.error("Validation error:", error);
    return res.status(400).json({ error: "Invalid input." });
  }

  try {

    //! Check If User Existing
    const existingUser = await User.findOne({ where: { userId: userId } });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    } else {

      //! Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

      //! Update the User details
      existingUser.firstName = firstName;
      existingUser.lastName = lastName;
      existingUser.gender = gender;
      existingUser.password = hashedPassword;

      //! Check if a new image is uploaded
      if (req.file) {
        const newImageName = req.file.filename;
        existingUser.imageName = newImageName;
      }

      //! Save the changes
      await existingUser.save();

      res.status(200).json({
        success: true,
        message: 'User Updated Successfully',
        User: existingUser.toJSON(),
      });
    }

  } catch (error) {
    console.error('An Error Occurred While Fetching User:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching User',
      error: error.message,
    });
  }
}

//! Delete User By Id 
const deleteUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    //! Check if the User exists
    const existingUser = await User.findByPk(userId);

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    //! Soft delete the User
    await User.update(
      { isDeleted: true },
      {
        where: { userId: userId },
      }
    );

    //! Save the changes
    await existingUser.save();

    res.status(200).json({
      success: true,
      message: 'User soft deleted successfully',
      User: existingUser.toJSON(),
    });
  } catch (error) {
    console.error('An error occurred while soft deleting the User:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while soft deleting the User',
      error: error.message,
    });
  }
}

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUserById,
  imageUser,
  deleteUserById
};