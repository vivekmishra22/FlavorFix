const mongoose=require("mongoose");

const recipeSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    ingredients:{
        // type:String,
        type:Array,
        required:true
    },
    instructions:{
        type:String,
        required:true
    },
    time:{
        type:String,
        // required:true
    },
    coverImage:{
        type:String,
        // required:true
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})

module.exports=mongoose.model("Recipe", recipeSchema);