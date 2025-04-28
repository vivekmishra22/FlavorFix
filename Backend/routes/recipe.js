// Import Express framework to create router
const express = require("express");

// Import recipe controller functions and upload middleware
const { getRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe, upload } = require("../controller/recipe");

// Import authentication middleware, Middleware to verify JWT token for protected routes
const verifyToken = require("../middleware/auth");
// Create an Express router instance
const router = express.Router();

/**
 * Recipe Routes:
 * 
 * GET     /get            - Get all recipes (public access)
 * GET     /getById/:id    - Get single recipe by ID (public access)
 * POST    /post           - Create new recipe (protected - requires auth + file upload)
 * PUT     /put/:id        - Update existing recipe (file upload optional)
 * DELETE  /delete/:id     - Delete recipe
 */

// Routes

// GET: Fetch all recipes from the database
router.get("/get",getRecipes); 
// GET: Fetch a single recipe by its ID
router.get("/getById/:id",getRecipe); 

// POST: Add a new recipe
// - Uses 'upload.single("file")' to handle image upload from form-data
// - Uses 'verifyToken' middleware to ensure only authenticated users can add recipes
router.post("/post", upload.single('file'), verifyToken, addRecipe); 

// PUT: Update an existing recipe by ID
// - Uses 'upload.single("file")' to optionally upload a new image
router.put("/put/:id", upload.single('file'), editRecipe) 

// DELETE: Delete a recipe by ID
router.delete("/delete/:id",deleteRecipe) 

// Export the router to be used in the main server file
module.exports=router;


/* 
Commented-out alternate route examples for testing or future reference:

// Basic POST route without image upload or authentication
// router.post("/post", addRecipe); 

// POST route that handles image upload using multer but no auth middleware
// router.post("/post", upload.single('file'), addRecipe); 

// PUT route for updating recipes without image upload
// router.put("/put/:id", editRecipe); 
*/