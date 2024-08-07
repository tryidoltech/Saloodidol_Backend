const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  getAllUsers,
  getUserProfile,
} = require("../controllers/userController");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logout);
router.get("/getUserProfile/:userId", getUserProfile);

//==========  For admin route   ===========//
router.get("/getAllUsers", getAllUsers);

module.exports = router;
