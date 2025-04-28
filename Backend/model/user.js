// Import mongoose, an ODM (Object Data Modeling) library for MongoDB
const mongoose = require("mongoose");

// Define a schema for the User collection
const userSchema = mongoose.Schema({

    // 'email' field: stores the user's email address
    email:{
        type:String,
        required:true,
        unique:true         // Ensures that each email must be unique in the collection
    },
    // 'password' field: stores the hashed password
    password:{
        type:String,
        required:true
    }
},{timestamps:true})    // Adds 'createdAt' and 'updatedAt' timestamps automatically

// Export the model so it can be used in other parts of the application
// 'User' is the name of the model (MongoDB will store it as 'users' collection)
module.exports=mongoose.model("User", userSchema);