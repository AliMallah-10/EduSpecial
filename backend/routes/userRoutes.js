const express = require("express");
const router = express.Router();
const userController = require("../controllers/usercontrollers");
const userMiddleware = require("../middlewares/usermiddleware");

// Public routes
router.post(
  "/register",
  userMiddleware.validateRequiredFields,
  userController.registerUser
);
router.post(
  "/login",
  userMiddleware.validateRequiredLogin,
  userController.loginUser
);
router.post("/refresh-token", userController.refreshToken);
// Private routes (require token authentication)
router.use(userMiddleware.verifyToken);
// Logout route

router.post("/logout", userController.logoutUser);
router.get(
  "/getuserbyid/:id",
  userMiddleware.checkResourceOwnership,
  userMiddleware.checkAdminRole,
  userController.getUserById
);
router.put(
  "/updateuserbyid/:id",
  userMiddleware.checkAdminRole,
  userMiddleware.checkResourceOwnership,
  userController.updateUserById
);
router.delete(
  "/deleteuserbyid/:id",
  userMiddleware.checkResourceOwnership,
  userMiddleware.checkAdminRole,
  userController.deleteUserById
);

router.get(
  "/getuserbyemail/:email",
  userMiddleware.checkAdminRole,
  userController.getUserByEmail
);
router.put(
  "/updateuserbyemail/:email",
  userMiddleware.checkResourceOwnership,
  userController.updateUserByEmail
);
router.delete(
  "/deleteuserbyemail/:email",
  userMiddleware.checkAdminRole,
  userController.deleteUserByEmail
);

router.get("/users", userMiddleware.checkAdminRole, userController.getAllUsers);

router.get(
  "/getuserbyfirstname/:firstname",
  userMiddleware.checkAdminRole,
  userController.getUserByFirstname
);
router.post("/checkout", userController.Payments);

module.exports = router;
