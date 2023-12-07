require("dotenv").config();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { User } = require("../Models/Tables");

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

const checkUser = async (email) => {
  try {
    const existingUser = await User.findOne({
      where: {
        email: email,
      },
    });

    return existingUser;
  } catch (error) {
    console.error('An error occurred during user check:', error);
    throw error;
  }
};

authenticateWithGoogle = (req, res) => {
  res.redirect('/auth/google');
};

googleLogin = passport.authenticate('google', { scope: ['email', 'profile'] });

googleLoginCallback = passport.authenticate('google', {
  successRedirect: '/auth/google/success',
  failureRedirect: '/auth/google/failure',
});

registerUserByGoogle = async (req, res) => {
  try {
    const { displayName, emails, id } = req.user;
    const [firstName, lastName] = displayName.split(' ');
    const email = emails[0].value;

    // Check if the user already exists in the database
    const existingUser = await checkUser(email);

    if (existingUser) {
      // User already exists, create JWT token
      const payload = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        userRole: existingUser.userRole,
        userId: existingUser.userId,
      };

      const secretKey = process.env.SECRET_KEY;
      const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

      return res.status(200).json({
        message: 'User login successful',
        token: token,
      });
    }

    // User doesn't exist, create a new user in the database
    const userRole = 'user';
    const password = 'No Access';
    const gender = "No Access"

    const newUser = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      gender: gender,
    });

    if (newUser.error) {
      return res.status(400).json({ error: newUser.error });
    }

    // Prepare payload for JWT
    const payload = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      userRole: userRole,
      userId: newUser.userId, 
    };

    // Generate JWT token
    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

    res.status(200).json({
      message: 'User added successfully',
      token: token,
    });
  } catch (error) {
    console.error('Error saving user information to the database:', error);
    res.status(500).send('Internal Server Error');
  }
};

fail = (req, res) => {
  res.send('Failed to authenticate..');
};

logout = (req, res) => {
  req.logout(() => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
      }
      res.send('Goodbye!');
    });
  });
};

module.exports = {
  authenticateWithGoogle,
  googleLogin,
  googleLoginCallback,
  registerUserByGoogle,
  fail,
  logout,
}