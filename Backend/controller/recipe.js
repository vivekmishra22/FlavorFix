const Recipe = require("../model/recipe");
const multer  = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    //   cb(null, '/tmp/my-uploads')    basic storage
    cb(null, './public/images')
    },
    filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    //   cb(null, file.fieldname + '-' + uniqueSuffix)
    const filename = Date.now() + '-' + file.fieldname
    cb(null, filename)
    }
  })
  
  const upload = multer({ storage: storage })

const getRecipes = async(req,res)=>{
    const recipes=await Recipe.find()
    return res.json(recipes)
}

const getRecipe = async(req,res)=>{
    const recipe=await Recipe.findById(req.params.id)
    res.json(recipe)
}

const addRecipe = async(req,res)=>{
    // console.log(req.file) // for multer
    console.log(req.user) // for multer with Authorization
    const { title, ingredients, instructions, time}=req.body;

    if( !title || !ingredients || !instructions){
        res.json({message:"Required fields can't ne empty"})
    }

    const newRecipe = await Recipe.create({
        title, ingredients, instructions, time, coverImage :req.file.filename,
        createdBy : req.user.id
    })

    return res.json(newRecipe)
    // res.json({message:"Add Recipes"})
}

const editRecipe = async(req,res)=>{
    const { title, ingredients, instructions, time}=req.body;
    let recipe = await Recipe.findById(req.params.id)
    try {
        if(recipe){
            let coverImage = req.file ?. filename ?req.file?.filename : recipe.coverImage
            // await Recipe.findByIdAndUpdate(req.params.id,req.body,{new:true})
            // await Recipe.findByIdAndUpdate(req.params.id,{...req.body, coverImage:req.file.filename},{new:true})
            await Recipe.findByIdAndUpdate(req.params.id,{...req.body, coverImage},{new:true})
            res.json({title, ingredients, instructions, time})
        }
    } catch (err) {
        return res.status(404).json({message:"Not present"})
    }
}

const deleteRecipe = async(req,res)=>{
    try {
        await Recipe.deleteOne({_id:req.params.id})
        res.json({status:"ok"});
    } catch {
        return res.status(400).json({message:"error"});
    }
}


module.exports= {getRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe, upload};