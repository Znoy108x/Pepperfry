const jwt = require("jsonwebtoken")
const checkerAdmin = async (req , res , next) =>{
    let token = req.cookies.ZnoyEcom
    if(token !== undefined && token.length > 0){
        try{
            let data = await jwt.verify(token , process.env.ADMIN_JWT_SECRET)
            req.admin = data.Customer
            next();
        }catch(err){
            return res.status(501).json({success : false , message : "Your are not a admin!"})
        }
    }else{
        return res.status(501).json({success : false , message : "Please Give Auth Token!"})
    }
}
const checkerCustomer = async (req , res , next) =>{
    let token = req.cookies.ClientSideJWT
    if(token !== undefined && token.length > 0){
        try{
            let data = await jwt.verify(token , process.env.CUSTOMER_JWT_SECRET)
            req.customer = data.Customer
            next();
        }catch(err){
            return res.status(400).json({success : false , message : "Your are not a customer!"})
        }
    }else{
        return res.status(501).json({success : false , message : "Please Give Auth Token!"})
    }
}
module.exports = {checkerAdmin , checkerCustomer};