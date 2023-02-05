const mongoose = require("mongoose")
const {Schema} = mongoose
const CategorySchema = new Schema({
    Name : {
        type : String ,
        required : true ,
        unique : true
    },
    Product : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Product"
    },
    Admin : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }
},{timestamps : true})
module.exports = mongoose.model("Category" , CategorySchema)