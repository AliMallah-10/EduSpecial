const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Middleware to verify the JWT token
exports.verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  // // Exclude token verification for registration route
  // if (req.path === "/register") {
  //   return next();
  // }
  // Exclude token verification for registration route and refresh token route
  if (req.path === "/register" ) {
    return next();
  }
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. Token not provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid token" });
  }
};

// Middleware to check if the user has admin role
exports.checkAdminRole = async (req, res, next) => {
  try {
    // Ensure req.user is populated correctly
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    // Retrieve user information from the database
    const user = await User.findById(req.user.id);

    // Check if user has admin role
    if (!user || user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Access denied. Admin role required" });
    }

    // If the user has admin role, proceed to the next middleware/route handler
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
// Middleware to check if the user is the owner of the resource or has admin role
exports.checkResourceOwnership = async (req, res, next) => {
  const userId = req.user.id;
  const resourceId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user is the owner of the resource or has admin role
    if (user._id.toString() !== resourceId && user.role !== "admin") {
      return res.status(403).json({
        message:
          "Access denied. You are not the owner or an admin of this resource",
        userId: user._id.toString(),
        resourceId,
        userRole: user.role,
      });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Middleware to validate if all required fields are provided

exports.validateRequiredFields = async (req, res, next) => {
  const { role, firstname, lastname, password, bloodType, email } = req.body;

  if (!role || !firstname || !lastname || !password || !bloodType || !email) {
    return res.status(400).json({ error: "All fields are required" });
  }

  next();
};
exports.validateRequiredLogin = async (req, res, next) => {
  const { password, email } = req.body;

  if (!password || !email) {
    return res.status(400).json({ error: "All fields are required" });
  }

  next();
};
