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

// Private routes (require token authentication)
router.use(userMiddleware.verifyToken);

router.get(
  "/getuserbyid/:id",
  userMiddleware.checkResourceOwnership,

  userController.getUserById
);
router.put(
  "/updateuserbyid/:id",
  userMiddleware.checkResourceOwnership,
  userController.updateUserById
);
router.delete(
  "/deleteuserbyid/:id",
  userMiddleware.checkResourceOwnership,
  userController.deleteUserById
);

router.get("/getuserbyemail/:email", userController.getUserByEmail);
router.put(
  "/updateuserbyemail/:email",
  userMiddleware.checkResourceOwnership,
  userController.updateUserByEmail
);
router.delete(
  "/deleteuserbyemail/:email",
  userMiddleware.checkResourceOwnership,
  userController.deleteUserByEmail
);

router.get("/users", userMiddleware.checkAdminRole, userController.getAllUsers);

router.get("/getuserbyfirstname/:firstname", userController.getUserByFirstname);

module.exports = router;
