const mongoose = require("mongoose")
const {Schema} = mongoose
const ReviewSchema = new Schema({
    Name : {
        type : String ,
        required:true
    },
    User:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    Item:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Item"
    },
    Date : {
        type : String,
        required:true
    },
    Description:{
        type : String,
        required:true
    },
    Stars:{
        type:Number,
        required:true
    },
    Likes:{
        type : Number,
        required : true
    },
    Dislikes:{

    }
},{timestamps : true})
module.exports = mongoose.model("Review" , ReviewSchema)