// Importing required modules
const User = require("../model/user");  // User model
const bcrypt = require("bcrypt");       // Library for hashing and comparing passwords
const jwt = require("jsonwebtoken");    // JSON Web Token for authentication

// ---------------------------- SIGN UP --------------------------------

/**
 * User Signup Controller
 * Handles new user registration
 */

const userSignUp = async (req, res) => {

    try {
        // const { email, password } = req.body; // Destructure email and password from request body
        const email = req.body.email?.toLowerCase();  // Normalize email
        const { password } = req.body;
        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password is required" })
        }
        // Check if user already exists with the provided email
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email is already in use" });    // Return error if user exists
        }

        // Hash password with bcrypt (10 salt rounds)
        const hashPwd = await bcrypt.hash(password, 10);
        // Create new user with hashed password
        const newUser = await User.create({
            email, password: hashPwd
        });
        // Generate JWT token for the newly registered user
        let token = jwt.sign({ email, id: newUser._id }, process.env.SECRET_KEY, { expiresIn: '1h' })   //{expiresIn:'1hr'}
        // Return success response with token and user data
        return res.status(200).json({ token, user: newUser });
    } catch (err) {
        {
            console.error("Signup error:", err);
            return res.status(500).json({ error: "Server error during signup" });
        }
    }

}

// ---------------------------- LOGIN --------------------------------

/**
 * User Login Controller
 * Handles existing user authentication
 */

const userLogin = async (req, res) => {
    try {
        // const { email, password } = req.body    // Destructure login credentials
        const email = req.body.email?.toLowerCase();  // Normalize email
        const { password } = req.body;
        if (!email || !password) {              // Validate input
            return res.status(400).json({ message: "Email and password is required" })
        }
        // Find the user by email
        let user = await User.findOne({ email });

        // Compare the provided password with the hashed one in the DB
        if (user && await bcrypt.compare(password, user.password)) {
            let token = jwt.sign({ email, id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' })
            return res.status(200).json({ token, user });
        }
        else {
            // If login fails, return appropriate error message. Authentication failed
            return res.status(401).json({       // 401 Unauthorized
                error: "Invalid credentials",  // Used by frontend for error display
                message: "Invalid credentials" // Optional extra info
            });
        }
    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ error: "Server error during login" });
    }
}

// ---------------------------- GET USER BY ID ----------------------------

/**
 * Get Single User Controller
 */

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id) // Find user by ID
        res.json({ email: user.email })     // Return email only
    } catch (err) {
        console.error("Get user by Id error:", err);
        res.status(500).json({ error: "Server error fetching user by Id" });
    }
}

// ---------------------------- GET ALL USERS ----------------------------

/**
 * Get All Users Controller
 * Returns list of all users (for admin purposes)
 */

const getAllUser = async (req, res) => {
    try {
        const users = await User.find()       // Get all users
        return res.json(users);
    } catch (err) {
        console.error("Get all users error:", err);
        return res.status(500).json({ error: "Server error fetching All Users" });
    }
}

// Export all controller functions to be used in routes
module.exports = { userSignUp, userLogin, getUser, getAllUser };