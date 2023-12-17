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

    if(gender.toLowerCase() === 'male') {
      imageUrl = "https://storage.googleapis.com/agri-adventure-406920.appspot.com/profile.webp?GoogleAccessId=firebase-adminsdk-c0j5w%40agri-adventure-406920.iam.gserviceaccount.com&Expires=1735678800&Signature=kTFekltlXd5SyLAM1etpToqAfdkWKZqejT%2BGGyCFHWLbbZBe7k6YOG8nPbjilQLhKYC8PENhJt%2F67byUC9isrmkQ%2Bvjar54ZFGxGGVjb65hpbgtuYTc3eVxuGdwEKyhS6L7fWrUQbsxTb4oOn%2FhvsscwZwBYv6nYLKJFAkKiVA7VQFirL%2B1NSVwYlXi8J%2BOm7QVoDyr8hHYLFlQ%2BTXEhclx2sm3EiRlavNvDsJrNsLXpXwMu4eGG60MdLtZEHsnxL9sN7V3JfKrBNwPTeedB0t6014Qdjc3tqkWW%2Fsu2ctauF4DdyzlTfqj0y5ZS9PiKKovtTusJqmnoNcAZSOD7%2Fw%3D%3D"
    } else {
      imageUrl = "https://storage.googleapis.com/agri-adventure-406920.appspot.com/woman.webp?GoogleAccessId=firebase-adminsdk-c0j5w%40agri-adventure-406920.iam.gserviceaccount.com&Expires=1735678800&Signature=bGLA2uGbCTcEk%2B6boOKeC1mWEoh%2BQWHfMM5X85dedboBwwpOs8xxbfH4PS1ByjU%2FaSOFrqiJcmpyzlQe0ehCR%2BMuktZ5yFljb3Vz398rSgoH%2FKvdDKF9Wz8lUc3BucyTTvZ7mwb%2FPLH1VDEw%2BSi5C7vtE%2BEVNIVGkKfQmc4JoonnFmMRSWL%2B5W5xBx6OhF1vHZnOItUSz69DxFpo60rxKrAxiDCgSkDB7wzDICPAuH2EXaFh0%2BCvQeY3TihHKXr%2BdALIePcZfpn9q1JZvo0mQSX7z%2B003lhDBY6X35QG%2FdCoULN%2Ftzktl55xyydGt1qF%2FQDucM%2BFV9c%2B4kv5M75R2Q%3D%3D"
    }

    //! Create a new user
    const newUser = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      gender: gender,
      imageUrl: imageUrl
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

//! Login Admin For Dashboard
const loginAdmin = async (req, res) => {
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
      where: { email: email, userRole: "Admin" },
    });    

    if (!user) {
      return res.status(401).json({ error: 'You are not an Admin and you cannot log in' });
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
    // Check if User Exists
    const existingUser = await User.findOne({ where: { userId: userId } });
    const ratingsAndReviews = await Ratings_And_Reviews.findAll({
      where: { userId: userId },
    });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    } else {
      // Hash the password if provided
      if (password) {
        // ... (Your existing code for hashing password)
      }

      // Update the User details if provided
      if (firstName) {
        existingUser.firstName = firstName;
      }

      if (lastName) {
        existingUser.lastName = lastName;
      }

      if (gender) {
        existingUser.gender = gender;
      }

      // Update the image if provided
      if (req.file) {
        existingUser.imageUrl = res.locals.site
      }

      // Save changes to User
      await existingUser.save();

      // Update records in Ratings_And_Reviews
      for (const record of ratingsAndReviews) {
        if (firstName) {
          record.firstName = firstName;
        }

        if (lastName) {
          record.lastName = lastName;
        }

        if (req.file) {
          record.imageUrl = res.locals.site;
        }

        // Save changes to Ratings_And_Reviews
        await record.save();
      }

      res.status(200).json({
        success: true,
        message: 'User and associated ratings updated successfully',
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

const getAllUsersPagination = async (req, res) => {
  try {
    const page = req.query.page || 1; 
    const perPage = 5; 

    const offset = (page - 1) * perPage;

    const users = await User.findAll({
      offset,
      limit: perPage,
    });

    const totalUsers = await User.count(); 

    res.status(200).json({
      users,
      totalUsers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};


module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  getAdminUsers,
  loginAdmin,
  getAllUsersPagination
};