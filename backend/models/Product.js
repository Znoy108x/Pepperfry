const mongoose = require("mongoose")
const {Schema} = mongoose
const ProductSchema = new Schema({
    Name : {
        type : String , 
        required : true , 
        unique : true,
        trim : true
    },
    Admin : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }
},{timestamps : true})
module.exports = mongoose.model("Product" , ProductSchema)