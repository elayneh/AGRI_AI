const jwt = require("jsonwebtoken");

export const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    console.error("Access denied please login first");
    res.status(401).json({ error: "Access denied please login first." });
  } else {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        res.status(403).json({
          error: "Unauthorized access, please login again",
        });
      } else {
        req.body.userData = user;
        next();
      }
    });
  }
};
