const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()
const Product =  require("../models/Product")
const {checkerAdmin , checkerCustomer} = require("../middleware/checker")

router.post("/add-product" , checkerAdmin , async (req , res)=>{
    try{
        console.log(req.body)
        let Product_Data = await Product.create({
            Name : req.body.Name , 
            Admin : req.admin._id,
        })
        return res.status(200).json({success : true , message : "Product created successfully!" , Product : Product_Data})
    }catch(err){
        return res.status(501).json({success : false , message : err})
    }
})
router.get("/get-products",async (req,res) => {
    try{
        const All_Products = await Product.find({})
        return res.status(200).json({success : true , message  : "Here are all the products!" , Products : All_Products})
    }catch(err){
        return res.status(501).json({success : false , message : err})
    }       
})

router.get("/get-product/:id",async (req,res) => {
    try{
        const All_Products = await Product.find({_id : req.params.id})
        return res.status(200).json({success : true  , Products : All_Products})
    }catch(err){
        return res.status(501).json({success : false , message : err})
    }       
})


router.delete("/delete-product/:id" , checkerAdmin ,  async (req , res)=>{
    try{
        const isPresent = await Product.findOne({_id : req.params.id})    
        if(isPresent){
            await Product.findByIdAndDelete({_id : req.params.id})
            return res.status(200).json({success : true , message : "Product Deleted Successfully!"})
        }else{
            return res.status(400).json({success : true , message : "Error while deleting the product!"})
        }
    }catch(err){
        return res.status(501).json({success : false , message : err})
    }
})
router.put("/update-product/:id" , checkerAdmin ,  async (req , res)=>{
    try{
        const isPresent = await Product.findOne({_id : req.params.id})    
        if(isPresent){
            const New_Product = {
                Name : req.body.Name || isPresent.Name,
                Admin : req.admin._id,
                Description : req.body.Description || isPresent.Description
            }
            await Product.findByIdAndUpdate({_id : req.params.id} , {$set : New_Product})
            return res.status(200).json({success : true , message : "Product updated Successfully!"})
        }else{
            return res.status(400).json({success : true , message : "Error while updating the product!"})
        }
    }catch(err){
        return res.status(501).json({success : false , message : err})
    }
})

module.exports = router