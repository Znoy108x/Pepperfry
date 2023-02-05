const mongoose = require("mongoose")
const {Schema} = mongoose
const CustomerSchema = new Schema({
    Name : {
        type : String ,
        required : true , 
        trim : true
    },
    Email:{
        type:String , 
        required:true , 
        unique:true,
        trim : true
    },
    Password:{
        type:String , 
        required:true , 
        trim : true
    },
    PhoneNumber:{
        type:String , 
        required:true , 
        unique:true,
        trim : true
    },
    PinCode : {
        type : String,
        required : true
    }
},{timestamps : true})
module.exports = mongoose.model("Customer" , CustomerSchema)