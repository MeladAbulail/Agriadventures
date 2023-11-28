// middleware/authenticateToken.js
const jwt = require("jsonwebtoken");

function authorize(allowedRoles) {
  return (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).json({ message: "Access is forbidden. You must authenticate first" });
    }

    try {
      const secretKey = process.env.SECRET_KEY;
      const decodedToken = jwt.verify(token, secretKey);
      const user_type = decodedToken.user_type;

      if (allowedRoles.includes(user_type)) {
        next();
      } else {
        res.status(403).json({ message: 'Access is prohibited. You do not have permission.' });
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      res.status(401).json({ message: "Access is forbidden. Invalid token." });
    }
  };
}

module.exports = {
  authorize
};



