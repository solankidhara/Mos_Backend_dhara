const adminAuth = async (req, res, next) => {
  try {
    if (req.user.role === "admin") {
      return next();
    }
    // throw new Error;
  } catch (err) {
    res.status(401).json({
      errorType: "admin authentication error",
      message: err,
    });
  }
};

module.exports = adminAuth;
