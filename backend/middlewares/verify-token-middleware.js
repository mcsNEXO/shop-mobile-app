const authenticateToken = (req, res, next) => {
  if (req.session.isAuthenticated) {
    next();
  } else {
    res.status(401).json({ message: "Not authorization" });
  }
};

module.exports = authenticateToken;
