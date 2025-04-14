const express = require("express");
const { getRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe, upload } = require("../controller/recipe");
const router = express.Router();

router.get("/get",getRecipes); //Get all recipes
router.get("/getById/:id",getRecipe); // Get recipe by id
// router.post("/post",addRecipe); // Add recipe
router.post("/post", upload.single('file'), addRecipe); // Add recipe using multer
router.put("/put/:id", editRecipe) // Edit Recipe
router.delete("/delete/:id",deleteRecipe) // Delete recipe

module.exports=router;