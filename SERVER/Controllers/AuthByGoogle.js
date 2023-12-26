  require("dotenv").config();
  const passport = require('passport');
  const jwt = require('jsonwebtoken');
  const { User } = require("../Models/Tables");

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
  
      const existingUser = await User.findOne({ where: { email } });
  
      if (existingUser) {
        const payload = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          userRole: existingUser.userRole,
          userId: existingUser.userId,
        };
  
        const secretKey = process.env.SECRET_KEY;
        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
        res.cookie('token', token, { maxAge: 900000, sameSite: 'strict', secure: true });
        res.cookie('userId', existingUser.userId, { maxAge: 900000, sameSite: 'strict', secure: true });
        res.redirect('http://localhost:3000/');
  
      } else {

        const password = "No Access";
        const gender = undefined
        const userRole = "User"

        if(gender === undefined) {
          imageUrl = "https://storage.googleapis.com/agri-adventure-406920.appspot.com/man-and-woman.jpg?GoogleAccessId=firebase-adminsdk-c0j5w%40agri-adventure-406920.iam.gserviceaccount.com&Expires=1735678800&Signature=ViKJWoEStvTDQI5d4RtXHJbz4XRo7VzoJt21bmoJIfdLfjYlctSHhpsuoW6bw8L%2Fkb0JDXutGNU3g7iouob5IEqeTQv%2Fpml7oK3QITDaftV6H%2BKr59MQHaROysJ8vFRyr7y%2FtqI47ctU1s%2FuWmHZ5AYfZVWghTDFpFAVCDi57%2F%2FkjDCACFOnuuZ0b5SxcWg9YvepvFeOko88NSsG7qXV2unAoKBpPcFvgd7M0Iv%2F%2FmgDs1Ifi4IpphmciQhrLiGaKYnKyu8eUlgbJAQ%2BKBNHG%2BWt5AWpHOySx5HrLD7e5CpnVlJ2hI0kwdrzfp99%2BTyPOk6%2BPQNWnhAA0zDxLPqdZA%3D%3D"
        }
  
        const newUser = await User.create({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          gender: gender,
          imageUrl: imageUrl
        });
  
        if (newUser.error) {
          return res.status(400).json({ error: newUser.error });
        }

        const payload = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          userRole: userRole,
          userId: newUser.userId,
        };
  
        const secretKey = process.env.SECRET_KEY;
        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
        res.cookie('token', token, { maxAge: 900000, sameSite: 'strict', secure: true });
        res.cookie('userId', newUser.userId, { maxAge: 900000, sameSite: 'strict', secure: true });
        res.redirect('http://localhost:3000/');
      }
    } catch (error) {
      console.error('Error saving user information to the database:', error);
      res.status(500).send('Internal Server Error');
    }
  };


  fail = (req, res) => {
    res.send('Failed to authenticate..');
    console.log('Failed to authenticate..')
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