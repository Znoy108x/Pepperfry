const express = require("express")
const app = express()
const cors = require("cors")
const db = require("./db")
const colors = require("colors")
const cookies = require("cookie-parser")
require("dotenv").config()
db()
app.use(cookies())
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: [ process.env.ADMIN_PORT , process.env.CLIENT_PORT ]
}))
app.use("/Customer/Images" , express.static(__dirname +"/assets/images/Customers"))
app.use("/Items/Images" , express.static(__dirname +"/assets/images/Items"))
app.use("/ProductBanner/Images" , express.static(__dirname +"/assets/images/ProductBanners"))

// Routes
console.log()
app.use("/api" , require("./routes/user"))
app.use("/api" , require("./routes/product"))
app.use("/api" , require("./routes/category"))
app.use("/api" , require("./routes/items"))
app.use("/api" , require("./routes/orders"))
app.use("/api" , require("./routes/razor"))


// Routes
const port = process.env.PORT || 5000
app.listen(port , () =>{
    console.log(`Backend Running On Port ${port}`.rainbow)
})