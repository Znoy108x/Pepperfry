const mongoose = require("mongoose")
const connectToMongoose = () =>{
    mongoose.connect(`${process.env.MONGODB_URL}` , () =>{
        console.log(`Connected to the ${db_name}`.rainbow)
    })
}
module.exports =  connectToMongoose