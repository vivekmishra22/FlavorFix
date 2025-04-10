const mongoose = require("mongoose");

// const connectDb = async()=>{
//     await mongoose.connect(process.env.CONNECTION_STRING)
//     .then(()=>console.log("Connected..."))
// }

// module.exports = connectDb;

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Connected...");
    } catch (error) {
        console.error("Connection error:", error);
        process.exit(1); // Exit process with failure
    }
}

module.exports = connectDb;