const express = require("express");
const router = express.Router();
const Order = require("../models/Orders")
const { checkerAdmin , checkerCustomer} = require("../middleware/checker");
const Orders = require("../models/Orders");
router.get("/getorders/:id", async (req , res)=>{
    const CustomerOrder = await Order.find({ Customer : req.params.id})
    return res.status(200).json({success : true , CustomerOrder : CustomerOrder })
})

router.get("/gellAllOrders" , async (req , res)=>{
    const Order_Data = await Orders.find({})
    // let Order_Object  = {}
    // for(let i = 0 ; i<Order_Data.length; i++){
    //     let customer_id = Order_Data[i].Customer
    //     if(Order_Object.hasOwnProperty(customer_id)){
    //         Order_Object[customer_id].Items.push(...Order_Data[i].Items)
    //     }else{
    //         Order_Object[customer_id] = Order_Data[i]
    //     }
    // }
    res.status(200).json({Order_Data : Order_Data})
})

module.exports = router;