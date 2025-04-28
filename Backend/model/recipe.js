const mongoose=require("mongoose");         // Import Mongoose library

// Define the schema for a Recipe
const recipeSchema=mongoose.Schema({
    title:{
        type:String,            // Recipe title (e.g., "Paneer Butter Masala")
        required:true           // Mandatory field
    },
    ingredients:{
        type: [String],         // List of ingredients as an array of strings
        required:true           // Mandatory field
    },
    instructions:{
        type:String,
        required:true
    },
    time:{
        type:String,
    },
    coverImage:{                
        type:String,            // URL or filename for the recipe image
        default: ""             // If no image is provided, use an empty string
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,  // Reference to the User who created it
        ref:"User",                             // Linked to the User model
        required: true                          // Every recipe must have a creator
    }   
},{timestamps:true})            // Automatically adds createdAt and updatedAt fields

module.exports=mongoose.model("Recipe", recipeSchema);