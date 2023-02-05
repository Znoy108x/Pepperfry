const mongoose = require("mongoose")
const {Schema} = mongoose
const ItemSchema = new Schema({
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
    },
    Category:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category"
    },
    Price : {
        type : Number , 
        required : true , 
    },
    Discount : {
        type :  Number,
        default : 0
    },
    Image : {
        type : String,
        required:true
    },
    MainImage:{
        type : Array,
        required : true
    },
    Description:{
        type  :String , 
        required: true
    },
    ManufacturingId:{
        type : String , 
        required:true
    },
    ManufacturingDate : {
        type : String , 
        required :true
    },
    Colors:{
        type : Array,
        required : true
    },
    Size:{
        type : Array,
        required: true
    },
    Gender :{
        type : String , 
        default : "none"
    }
},{timestamps : true})
module.exports = mongoose.model("Item" , ItemSchema)