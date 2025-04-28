// Importing required modules
const express = require("express"); // Express framework
const router = express.Router();    // Create a new router instance
const {userSignUp, userLogin, getUser, getAllUser} = require("../controller/user"); // Import from user controller file

// -------------------- ROUTES ------------------------ //

router.post("/signUp",userSignUp);  // Handle user signup requests
router.post("/login", userLogin);   // Handle user login
router.get("/user/:id", getUser);   // Get a single user’s email by ID
router.get("/allUser", getAllUser); // Get list of all users (can be admin-specific)

// Export the router to be used in the main server
module.exports=router;