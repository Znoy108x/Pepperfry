const mongoose = require("mongoose")
const connectToMongoose = () =>{
    mongoose.connect(`${process.env.MONGODB_URL}` , () =>{
        console.log(`Connected to the Mongo Db!`.rainbow)
    })
}
module.exports =  connectToMongoose