// Import JSON Web Token package for verifying tokens
const jwt = require("jsonwebtoken");

/**
 * JWT Authentication Middleware
 * Verifies and decodes JWT tokens from Authorization header
 */

// Middleware to verify JWT tokens for protected routes
const verifyToken = async (req, res, next) => {

    try {
        // Extract the token from the request headers(Authorization header) (usually sent as "Bearer <token>")
        let token = req.headers['authorization'];

        if (token) {
            // Extract token from "Bearer <token>" format
            // Remove "Bearer " prefix and get the actual token
            token = token.split(" ")[1];
            // Verify the token using the secret key
            jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
                if (err) {
                    // If token is invalid or expired
                    return res.status(400).json({ message: "Invalid token" })
                } else {
                    // If token is valid, store decoded user info (like id, email) in req.user
                    console.log(decoded)    // Useful for debugging
                    req.user = decoded  // Attach user info to request object for use in next middleware/controller
                    next();     // Move to the next middleware/controller
                }
            })
        } else {
            // If token is missing from request headers
            return res.status(401).json({ message: "Token missing" });
        }
    } catch (err) {
        {
            console.error("JWT verification error:", err.message);
            return res.status(403).json({ message: "Invalid or expired token" }); // 403 Forbidden
        }
    }
}

// Export the middleware for use in routes
module.exports = verifyToken;