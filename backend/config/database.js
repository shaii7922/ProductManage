const mongoose = require('mongoose')
const { MONGODB_LOCAL } = require('.')


exports.connectDb = async(req,res)=>{
    await mongoose.connect(MONGODB_LOCAL)
    console.log("mONGO IS CONNECTED");
    
}
