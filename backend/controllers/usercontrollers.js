const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const stripe = require("stripe")(process.env.SECRET_STRIPE_KEY);
// Function to register a new user
exports.registerUser = async (req, res) => {
  try {
    const { role, firstname, lastname, password, bloodType, email } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }],
    });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      role,
      firstname,
      lastname,
      password: hashedPassword,
      bloodType,
      email,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

//todo function for stripe payments-----------------------------
exports.Payments = async (req, res) => {
  try {
    // Check if req.body.items exists and is an array
    if (!req.body.items || !Array.isArray(req.body.items)) {
      return res.status(400).json({
        error: "Invalid or missing 'items' property in the request body.",
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        return {
          price_data: {
            currency: "usd", // Change to the appropriate currency code
            product_data: {
              name: item.name,
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        };
      }),
      success_url: "http://localhost:3000/users/login",
      cancel_url: "http://localhost:3000/",
    });
    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//todo Function to refresh access token using refresh token
exports.refreshToken = async (req, res) => {
  try {
    // Extract refresh token from the Authorization header
    const refreshTokenHeader = req.header("refreshauth");

    if (invalidatedRefreshTokens.includes(refreshTokenHeader)) {
      return res.status(401).json({ error: "Invalid refresh token" });
    }
    if (!refreshTokenHeader) {
      return res.status(400).json({ error: "Refresh token not provided" });
    }

    // Extract the token from the "Bearer token" format
    const [, refreshToken] = refreshTokenHeader.split(" ");

    // Validate the refresh token (check against the stored tokens, database, etc.)
    // If valid, get the user ID from the refresh token payload
    const decodedRefreshToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const userId = decodedRefreshToken.id;

    // Generate a new access token
    const newAccessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: "3 minute",
    });

    res.status(200).json({
      accessToken: newAccessToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
//todo time for incorrect login --------------------
const MAX_LOGIN_ATTEMPTS = 3;
const LOCKOUT_TIME_SHORT = 1 * 60 * 1000; // 1 minute
const LOCKOUT_TIME_LONG = 60 * 60 * 1000; // 1 hour

// Function to log in a user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid Email" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Check if the account is currently locked
    if (user.loginAttempts >= MAX_LOGIN_ATTEMPTS && user.lastLoginAttempt) {
      const elapsedTime = Date.now() - user.lastLoginAttempt;

      // Check if it's been less than 1 minute since the last attempt
      if (elapsedTime < LOCKOUT_TIME_SHORT) {
        const remainingTime = formatRemainingTime(
          LOCKOUT_TIME_SHORT - elapsedTime
        );
        return res.status(401).json({
          message: `Please try again after ${remainingTime} minute.`,
        });
      } else if (elapsedTime < LOCKOUT_TIME_LONG) {
        // Check if it's been less than 1 hour since the last attempt
        const remainingTime = formatRemainingTime(
          LOCKOUT_TIME_LONG - elapsedTime
        );
        return res.status(401).json({
          message: `Account locked For 1 Hour. Please try again after ${remainingTime} minute.`,
        });
      } else {
        // If it's been more than 1 hour, reset the login attempts
        await User.findByIdAndUpdate(user._id, {
          loginAttempts: 0,
          lastLoginAttempt: Date.now(),
        });
      }
    }

    if (!isPasswordValid) {
      // Increment login attempts
      await User.findByIdAndUpdate(user._id, {
        $inc: { loginAttempts: 1 },
        lastLoginAttempt: Date.now(),
      });

      // Check if the user should be locked out
      if (user.loginAttempts >= MAX_LOGIN_ATTEMPTS - 1) {
        const remainingTime = formatRemainingTime(LOCKOUT_TIME_SHORT);
        return res.status(401).json({
          message: `Invalid Password. Account will be locked after ${MAX_LOGIN_ATTEMPTS} failed attempts. Please try again after ${remainingTime}.`,
        });
      }

      return res.status(401).json({ message: "Incorrect Password" });
    }

    // If the password is valid, reset login attempts
    await User.findByIdAndUpdate(user._id, {
      loginAttempts: 0,
      lastLoginAttempt: Date.now(),
    });

    // Generate JWT tokens
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1 minute",
    });
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "2 minutes",
      }
    );

    // Set cookies in the response
    res.cookie("accessToken", accessToken, { httpOnly: true });
    res.cookie("refreshToken", refreshToken, { httpOnly: true });

    res.status(200).json({
      message: "Login successfully",
      accessToken,
      refreshToken,
      role: user.role,
      email,
      firstname: user.firstname,
      lastname: user.lastname,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

//? Function to format remaining time in MM:SS format--------------
function formatRemainingTime(timeInMilliseconds) {
  const minutes = Math.floor(timeInMilliseconds / (60 * 1000));
  const seconds = Math.floor((timeInMilliseconds % (60 * 1000)) / 1000);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
}
//? Function to format remaining time in MM:SS format---------------
//! Maintain a list of invalidated refresh tokens (in-memory or persistent store)
const invalidatedRefreshTokens = [];

// Function to handle user logout
exports.logoutUser = async (req, res) => {
  try {
    // Clear any existing tokens on the client-side (cookies, localStorage, etc.)
    // Clear cookies in the response
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    // Get the refresh token from the request header
    const refreshTokenHeader = req.header("refreshauth");
    const refreshToken = refreshTokenHeader
      ? refreshTokenHeader.replace("Bearer ", "")
      : null;

    // Check if the refresh token is in the list of invalidated tokens
    if (refreshToken && invalidatedRefreshTokens.includes(refreshToken)) {
      return res.status(401).json({ error: "Invalid refresh token" });
    }

    // Add the refresh token to the list of invalidated tokens
    invalidatedRefreshTokens.push(refreshToken);

    // Respond with a success message
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
// Function to get user by ID
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      user: {
        _id: user._id,
        role: user.role,
        firstname: user.firstname,
        lastname: user.lastname,
        bloodType: user.bloodType,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Function to update user information by ID
exports.updateUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const { role, firstname, lastname, bloodType, email, password } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = role || user.role;
    user.firstname = firstname || user.firstname;
    user.lastname = lastname || user.lastname;
    user.bloodType = bloodType || user.bloodType;
    user.email = email || user.email;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }

    await user.save();

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Function to update user information by email
exports.updateUserByEmail = async (req, res) => {
  try {
    const userEmail = req.params.email;
    const { role, firstname, lastname, bloodType, email, password } = req.body;

    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = role || user.role;
    user.firstname = firstname || user.firstname;
    user.lastname = lastname || user.lastname;
    user.bloodType = bloodType || user.bloodType;
    user.email = email || user.email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }

    await user.save();

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Function to delete a user account by ID
exports.deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Function to delete a user account by email
exports.deleteUserByEmail = async (req, res) => {
  try {
    const userEmail = req.params.email;

    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Function to retrieve a user by email
exports.getUserByEmail = async (req, res) => {
  try {
    const userEmail = req.params.email;

    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      user: {
        _id: user._id,
        role: user.role,
        firstname: user.firstname,
        lastname: user.lastname,
        bloodType: user.bloodType,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
// Function to retrieve all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // Exclude the password field from the results

    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
// Function to retrieve a user by firstname
exports.getUserByFirstname = async (req, res) => {
  try {
    const userfirstname = req.params.firstname; // Extract the firstname from the request params

    const user = await User.findOne({ firstname: userfirstname });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send user information without the password field
    res.status(200).json({
      user: {
        _id: user._id,
        role: user.role,
        firstname: user.firstname,
        lastname: user.lastname,
        bloodType: user.bloodType,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
