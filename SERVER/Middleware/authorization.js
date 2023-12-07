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

      // Check token expiration
      if (decodedToken.exp && Date.now() >= decodedToken.exp * 1000) {
        return res.status(401).json({ message: "Access is forbidden. Token has expired." });
      }

      const userRole = decodedToken.userRole;
      const userId = decodedToken.userId;

      if (allowedRoles.includes(userRole)) {
        req.user = { userId, userRole }; // Attach user information to the request
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
