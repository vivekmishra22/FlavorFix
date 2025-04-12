const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSignUp = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password is required" })
    }
    let user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ error: "Email is already exit" });
    }
    const hashPwd = await bcrypt.hash(password,10)
    const newUser = await User.create({
        email, password:hashPwd
    })
    let token = jwt.sign({email, id:newUser._id}, process.env.SECRET_KEY)   //{expiresIn:'1hr'}
    return res.status(200).json({token, user:newUser})
}


const userLogin = async (req, res) => {
    const { email, password } = req.body
    if( !email || !password) {
        return res.status(400).json({ message : "Email and password is required"})
    }

    let user = await User.findOne({ email });
    if(user && await bcrypt.compare(password, user.password)){
        let token = jwt.sign({email, id:user._id}, process.env.SECRET_KEY)
        return res.status(200).json({token, user})
    }
    else {
        // return res.status(400).json({message : "Invalid credentials"})
        return res.status(400).json({
            error: "Invalid credentials",  // Must use "error" key (matches frontend)
            message: "Invalid credentials" // Optional additional field
        });
    }
}


// const getUser = async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id).select("email");
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         return res.status(200).json(user);
//     } catch (error) {
//         console.error("Error fetching user:", error.message);
//         return res.status(500).json({ message: "Server error" });
//     }
// };



const getUser = async (req, res) => {
    const user = await User.findById(req.params.id)
    res.json({ email: user.email })
}

const getAllUser = async(req,res)=>{
    const recipes=await User.find()
    return res.json(recipes)
}

module.exports = { userSignUp, userLogin, getUser, getAllUser };