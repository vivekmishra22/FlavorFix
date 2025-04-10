const Recipe = require("../model/recipe");

const getRecipes = async(req,res)=>{
    const recipes=await Recipe.find()
    return res.json(recipes)
}

const getRecipe = async(req,res)=>{
    const recipe=await Recipe.findById(req.params.id)
    res.json(recipe)
}

const addRecipe = async(req,res)=>{
    const { title, ingredients, instructions, time}=req.body;

    if( !title || !ingredients || !instructions){
        res.json({message:"Required fields can't ne empty"})
    }

    const newRecipe = await Recipe.create({
        title, ingredients, instructions, time
    })

    return res.json(newRecipe)
    // res.json({message:"Add Recipes"})
}

const editRecipe = async(req,res)=>{
    const { title, ingredients, instructions, time}=req.body;
    let recipe = await Recipe.findById(req.params.id)
    try {
        if(recipe){
            await Recipe.findByIdAndUpdate(req.params.id,req.body,{new:true})
            res.json({title, ingredients, instructions, time})
        }
    } catch (err) {
        return res.status(404).json({message:"Not present"})
    }
}

const deleteRecipe = (req,res)=>{
    res.json({message:"Delete Recipes"})
}


module.exports= {getRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe};