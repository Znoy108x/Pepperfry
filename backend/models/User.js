const mongoose = require("mongoose")
const {Schema} = mongoose
const UserSchema = new Schema({
    Name : {
        type : String ,
        required : true , 
        unique : true,
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
        unique:true,
        trim : true
    }
    ,
    Role:{
        type : String , 
        default : "customer" ,
        enum :[
            "admin" , "customer"
        ],
        required:true,
        trim : true
    },
    ProfilePic:{
        type:String , 
        required:true , 
        unique:true,
        trim : true
    }
},{timestamps : true})
module.exports = mongoose.model("User" , UserSchema)