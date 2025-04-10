const express = require("express");
const { getRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe } = require("../controller/recipe");
const router = express.Router();

router.get("/get",getRecipes); //Get all recipes
router.get("/getById/:id",getRecipe); // Get recipe by id
router.post("/post",addRecipe); // Add recipe
router.put("/put/:id", editRecipe) // Edit Recipe
router.delete("/delete/:id",deleteRecipe) // Delete recipe

module.exports=router;