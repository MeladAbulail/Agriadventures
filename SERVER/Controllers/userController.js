const jwt = require("jsonwebtoken");
const joi = require("joi");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { User, Ratings_And_Reviews } = require("../Models/Tables");

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
      confirmPassword: joi.string().min(6).max(20),
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
      userId: newUser.userId
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
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      userRole: user.userRole,
      userId: user.userId,
    };

    // Generate JWT token
    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login successful.',
      token: token,
      userId: user.userId
    });

  } catch(error) {
    console.error('An error occurred during the login process:', error);
    res.status(500).json({ error: 'An error occurred during the login process.' });
  }
}

//! Get All Users
const getAllUsers = async (req, res) => {
  try {
    const { page = 1, pageSize = 5 } = req.query;

    const offset = (page - 1) * pageSize;
    const users = await User.findAndCountAll({
      where: {
        isDeleted: false,
      },
      limit: pageSize,
      offset: offset,
    });

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      users: users.rows.map((user) => user.toJSON()),
      totalCount: users.count,
      totalPages: Math.ceil(users.count / pageSize),
    });
  } catch (error) {
    console.error("An error occurred while fetching Users:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching Users",
      error: error.message,
    });
  }
};

//! Get User By Id 
const getUserById = async (req, res) => {
  const userId = req.user.userId;
  try {
    //! Check If User Existing
    const existingUser = await User.findOne({ where: { userId: userId } });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User retrieved successfully",
        user: existingUser
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

//! Get Admin Users
const getAdminUsers = async (req, res) => {
  try {
    const Admins = await User.findAll({
      where: { userRole: "Admin" }
    });

    if(!Admins) { 
      return res.status(404).json({
        succes: false,
        message: "Not Found Admins",
      })
    }

    res.status(200).json({
      success: true,
      message: "Admins retrieved successfully",
      Admins: Admins
    });
  } catch (error) {
    console.error("An error occurred while fetching Admins:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching Admins",
      error: error.message,
    });
  }
};


//! Update User According UserId
const updateUserById = async (req, res) => {
  const userId = req.user.userId;
  const { firstName, lastName, gender, password } = req.body;

  //! Validate user input
  const userSchema = joi.object({
    firstName: joi.string().min(3).max(15),
    lastName: joi.string().min(3).max(15),
    password: joi.string().min(5).max(20),
    gender: joi.string().valid("male", "female").insensitive(),
    image: joi.allow(),
    email: joi.allow(),
  });

  const { error } = userSchema.validate(req.body);

  if (error) {
    console.error("Validation error:", error);
    return res.status(400).json({ error: "Invalid input." });
  }

  try {
    //! Check If User Existing
    const existingUser = await User.findOne({ where: { userId: userId } });
    const ratingsAndReviews = await Ratings_And_Reviews.findAll({
      where: {
        userId: userId
      }
    })

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    } else {
      //! Hash the password if provided
      if (password) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        existingUser.password = hashedPassword;
      }

      //! Update the User details if provided
      if (firstName) {
        existingUser.firstName = firstName;
        ratingsAndReviews.firstName = firstName;
      }

      if (lastName) {
        existingUser.lastName = lastName;
        ratingsAndReviews.lastName = lastName;
      }

      if (gender) {
        existingUser.gender = gender;
      }

      //! Update the image if provided
      if (req.file) {
        const imageName = res.locals.site;
        existingUser.imageUrl = imageName;
        ratingsAndReviews.imageUrl = imageName;
      }

      //! Save the changes
      await existingUser.save();
      await ratingsAndReviews.save();

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
};



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
  deleteUserById,
  getAdminUsers
};