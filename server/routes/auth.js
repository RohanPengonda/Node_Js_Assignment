const express = require("express");
const router = express.Router();
const multer = require("multer");
const authController = require("../controllers/authController");

const storage = multer.memoryStorage(); //for image storing 
const upload = multer({ storage });

// Register route with image upload
router.post("/register", upload.single("image"), authController.register);

router.post("/login", authController.login);

module.exports = router;
