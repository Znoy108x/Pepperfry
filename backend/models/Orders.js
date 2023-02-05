const mongoose = require("mongoose")
const {Schema} = mongoose
const OrderSchema = new Schema({
    Customer : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Customer",
        required : true
    },
    Items : {
        type : Array ,
        required:true
    }
},{timestamps : true})
module.exports = mongoose.model("Order", OrderSchema)