export const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization && authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  jwt.verify(
    token,
    process.env.JWT_SECRET_KEY || "defaultKey",
    (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Token is not valid" });
      }
      console.log(req);
      next();
    }
  );
};
