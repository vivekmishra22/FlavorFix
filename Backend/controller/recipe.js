// Importing the Recipe model
const Recipe = require("../model/recipe");

// Importing multer for handling file uploads
const multer = require('multer');

// Configure storage settings for uploaded files using multer
const storage = multer.diskStorage({
    // Set the destination directory for uploaded files
    destination: function (req, file, cb) {
        cb(null, './public/images');      // Save images in public/images folder 
        // null = no error, directory
    },
    // Set the filename format for uploaded files
    filename: function (req, file, cb) {
        const originalName = file.originalname;     // original filename with extension
        const filename = Date.now() + '-' + originalName;    // Example: 1617891234567-coverImage
        cb(null, filename)    // Callback with filename
    }
})

// Initialize multer with the configured storage settings
const upload = multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 } });  // 5 Mb size limit


// Get All Recipes 
const getRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();    // Fetch all recipes from the database
        res.status(200).json(recipes);  // Send the recipes with status 200
    } catch (err) {
        res.status(500).json({ message: "Server error" });  // Handle server errors
    }
};

// GET SINGLE RECIPE BY ID
const getRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);    // Find recipe by ID from route parameter
        // if (!recipe) return res.status(404).json({ message: "Recipe not found" }); not necessary
        res.status(200).json(recipe);   // Send the recipe data with status 200
    } catch (err) {
        res.status(500).json({ message: "Server error" });  // Handle server errors
    }
};

// ADD NEW RECIPE
const addRecipe = async (req, res) => {

    // Destructure fields from request body
    const { title, ingredients, instructions, time } = req.body;

    // Validate required fields
    if (!title || !ingredients || !instructions) {
        return res.status(400).json({ message: "Title, ingredients and instructions are required" });
    }

    try {
        // Create new recipe in the database
        const newRecipe = await Recipe.create({
            title,
            ingredients,
            instructions,
            time,
            coverImage: req.file.filename,  // Store uploaded image filename
            createdBy: req.user.id  // User ID from authentication middleware
        });

        return res.status(201).json(newRecipe); // Return created recipe with status 201
    } catch (err) {
        return res.status(500).json({ message: "Failed to add recipe" });   // Handle errors
    }
};

// EDIT EXISTING RECIPE
const editRecipe = async (req, res) => {
    // Destructure updated fields from request body
    const { title, ingredients, instructions, time } = req.body;

    try {
        const recipe = await Recipe.findById(req.params.id);        // Find recipe by ID

        if (recipe) {
            // Use uploaded image filename if available, else keep existing one
            let coverImage = req.file?.filename ? req.file?.filename : recipe.coverImage

            // Update recipe with new data  { ...req.body, coverImage } : - contains (e.g., title, ingredients, instructions, time), coverImage
            await Recipe.findByIdAndUpdate(req.params.id, { ...req.body, coverImage }, { new: true })
            res.status(200).json({ title, ingredients, instructions, time });   // Send success response
        }
    } catch (err) {
        res.status(500).json({ message: "Failed to update recipe", err });      // Handle error
    }
};

// DELETE A RECIPE
const deleteRecipe = async (req, res) => {
    try {
        await Recipe.deleteOne({ _id: req.params.id });  // Delete recipe by ID
        res.status(200).json({ message: "Recipe deleted successfully" });       // Send success message
    } catch (err) {
        res.status(500).json({ message: "Failed to delete recipe" });   // Handle errors
    }
};

// Export all controller functions and multer upload
module.exports = { getRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe, upload };