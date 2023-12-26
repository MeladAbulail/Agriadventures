const jwt = require("jsonwebtoken");
const joi = require("joi");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { User, Ratings_And_Reviews_Locations } = require("../Models/Tables");

//! Create A New User (Registration)
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, gender } = req.body
    //! Validate user input
    const userSchema = joi.object({
      firstName: joi.string().required().min(3).max(8).pattern(/^[a-zA-Z-_]+$/),
      lastName: joi.string().required().min(3).max(8).pattern(/^[a-zA-Z-_]+$/),      
      email: joi.string().email().required().min(5).max(50),
      password: joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*]).{6,20}$')).required(),
      gender: joi.string().valid("male", "female").insensitive().lowercase().required()
    });

    const { error } = userSchema.validate(req.body);

    if (error) {
      console.error("Validation error:", error);
      return res.status(400).json({ error: `Invalid input ${error}` });
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
      imageUrl = "https://storage.googleapis.com/agri-adventure-406920.appspot.com/man.webp?GoogleAccessId=firebase-adminsdk-c0j5w%40agri-adventure-406920.iam.gserviceaccount.com&Expires=1735678800&Signature=QoZNlS4G9i%2By5skJ65I8xaLMj9MlqxKAdxGqAwJxybWpIRrmX%2FkEynQVjK2sL1OOR6j8BZeIpqme0%2FPBnZrbjB244700TePxYYEOXnnhT96eslVCfaL3Co8VCjDLTOnieDme3R51j0DmrbsTLNcfTNvLn74SqdRs2J5CJp0%2FQbFJH1l6f5ifjzRTggijQzleFHVHZQ%2Ff55kWdmB2BpJnJJlaifVKY8cYZHldyV%2BxWlB7OLEGmpthFOR25hFI1WwMp4dvVWKAck9xQ9C6%2FTeFtFGB%2FICiduPtqv%2BMH9aIT5%2BGVRlVfog5uAqCgVei0I2PGFw7CEaDEkKba0ViQ8GtSw%3D%3D"
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
      email: joi.string().email().required().min(5).max(50),
      password: joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*]).{6,20}$')).required(),
    })

    const { error } = userSchema.validate(req.body);
    if (error) {
      console.error("Validation error:", error);
      return res.status(400).json( { error: `Invalid input ${error}` } );
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
  try {
    const existingUser = await User.findOne({ where: { userId: userId } });
    const ratingsAndReviews = await Ratings_And_Reviews_Locations.findAll({
      where: { userId: userId },
    });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    } else {
      if (existingUser.password !== "No Access") {
        const userSchema = joi.object({
          firstName: joi.string().required().min(3).max(8).pattern(/^[a-zA-Z-_]+$/),
          lastName: joi.string().required().min(3).max(8).pattern(/^[a-zA-Z-_]+$/),      
          gender: joi.string().valid("male", "female").insensitive().lowercase().required(),
          password: joi.string().required(),
          email: joi.allow(),
          image: joi.allow(),
        });
      
        const { error } = userSchema.validate(req.body);
      
        if (error) {
          console.error("Validation error:", error);
          return res.status(400).json({ error: `Invalid input ${error}` });
        }

        if(!password) {
          return res.status(401).json({ error: 'Password is required' });
        } else {
          const passwordMatch = await bcrypt.compare(password, existingUser.password);
          if (!passwordMatch) {
            return res.status(401).json({ error: 'Incorrect password' });
          }
        }
      } else {
        const userSchema = joi.object({
          firstName: joi.string().required().min(3).max(8).pattern(/^[a-zA-Z-_]+$/),
          lastName: joi.string().required().min(3).max(8).pattern(/^[a-zA-Z-_]+$/),      
          gender: joi.string().valid("male", "female", "Undefined").insensitive().lowercase().required(),
          password: joi.allow(),
          email: joi.allow(),
          image: joi.allow(),
        });
      
        const { error } = userSchema.validate(req.body);
      
        if (error) {
          console.error("Validation error:", error);
          return res.status(400).json({ error: `Invalid input ${error}` });
        }
      }

      if (firstName) {
        existingUser.firstName = firstName;
      }

      if (lastName) {
        existingUser.lastName = lastName;
      }

      if (gender) {
        existingUser.gender = gender;
      }

      if (req.file) {
        existingUser.imageUrl = res.locals.site
      }

      await existingUser.save();

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

    //! Hard delete the User
    await User.destroy({
      where: { userId: userId },
    });

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    console.error('An error occurred while deleting the User:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while deleting the User',
      error: error.message,
    });
  }
}


//! Get All Users Pagination
const getUsersPagination = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const itemsPerPage = req.query.itemsPerPage || 5;

    const users = await User.findAndCountAll({
      where: {
        isDeleted: false,
      },
      limit: itemsPerPage,
      offset: (page - 1) * itemsPerPage,
      order: [['createdAt', 'ASC']],
    });

    const totalPages = Math.ceil(users.count / itemsPerPage);

    const usersBan = await User.findAll({
      where: {
        isDeleted: false,
        isBanned: true,
      },
    });

    const admins = await User.findAll({
      where: {
        isDeleted: false,
        userRole: "Admin",
      },
    });

    res.status(200).json({
      success: true,
      message: 'Users retrieved successfully',
      users: users.rows,
      totalUsers: users.count,
      totalPages,
      currentPage: page,
      usersBan: usersBan.map(user => user.userId),
      admins: admins.map(user => user.userId),
    });
  } catch (error) {
    console.error('An error occurred while fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching users',
      error: error.message,
    });
  }
};


//! ban User By Id
const banUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const existingUser = await User.findByPk(userId);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    existingUser.isBanned = true;
    await existingUser.save();
    res.status(200).json({
      success: true,
      message: 'User banned successfully',
      user: existingUser.toJSON(),
    });
  } catch (error) {
    console.error('An error occurred while banning the user:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while banning the user',
      error: error.message,
    });
  }
};

//! unban User By Id
const unbanUserController = async (req, res) => {
  try {
    const { userId } = req.params;
    const existingUser = await User.findByPk(userId);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    existingUser.isBanned = false;
    await existingUser.save();
    res.status(200).json({
      success: true,
      message: 'User unbanned successfully',
      user: existingUser.toJSON(),
    });
  } catch (error) {
    console.error('An error occurred while unbanning the user:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while unbanning the user',
      error: error.message,
    });
  }
};

//! Make user Admin
const makeUserAdmin = async (req, res) => {
  try {
    const { userId } = req.params;
    const existingUser = await User.findByPk(userId);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    existingUser.userRole = "Admin";
    await existingUser.save();
    res.status(200).json({
      success: true,
      message: 'User Admin Now successfully',
      user: existingUser.toJSON(),
    });
  } catch (error) {
    console.error('An error occurred while Admin the user:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while Admin the user',
      error: error.message,
    });
  }
};

//! Make Admin User
const makeAdminUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const existingUser = await User.findByPk(userId);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    existingUser.userRole = "User";
    await existingUser.save();
    res.status(200).json({
      success: true,
      message: 'User User Now successfully',
      user: existingUser.toJSON(),
    });
  } catch (error) {
    console.error('An error occurred while User the user:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while User the user',
      error: error.message,
    });
  }
};

//! Get Users Count
const getUsersCount = async (req, res) => {
  try {
    const allusersCount = await User.count({
      where: {
        isDeleted: false,
      },
    });

    const usersBanCount = await User.count({
      where: {
        isDeleted: false,
        isBanned: true,
      },
    });

    const usersCount = await User.count({
      where: {
        isDeleted: false,
        userRole: "User",
      },
    });

    const adminsCount = await User.count({
      where: {
        isDeleted: false,
        userRole: "Admin",
      },
    });

    const males = await User.count({
      where: {
        isDeleted: false,
        gender: "Male",
      },
    });

    const females = await User.count({
      where: {
        isDeleted: false,
        gender: "Female",
      },
    });

    res.status(200).json({
      success: true,
      message: 'User count retrieved successfully',
      allusersCount,
      usersCount,
      adminsCount,
      usersBanCount,
      males,
      females
    });
  } catch (error) {
    console.error('An error occurred while fetching User count:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching User count',
      error: error.message,
    });
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
  getUsersPagination,
  banUserById,
  unbanUserController,
  getUsersCount,
  makeUserAdmin,
  makeAdminUser
};