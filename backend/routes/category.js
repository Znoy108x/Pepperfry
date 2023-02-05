const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()
const Category =  require("../models/Category")
const {checkerAdmin , checkerCustomer} = require("../middleware/checker")
router.post("/add-Category" , checkerAdmin ,  async (req , res)=>{
    try{
        let {Name , Product} = req.body
        let Category_Data = await Category.create({
            Name : Name , 
            Product : Product,
            Admin : req.admin._id
        })
        return res.status(200).json({success : true , message : "Category created successfully!" , Category : Category_Data})
    }catch(err){
        return res.status(501).json({success : false , message : err})
    }
})
router.get("/get-Categorys",async (req,res) => {
    try{
        const All_Categorys = await Category.find({})
        return res.status(200).json({success : true , message  : "Here are all the Categorys!" , Categorys : All_Categorys})
    }catch(err){
        return res.status(501).json({success : false , message : err})
    }       
})

router.get("/get-Category/:id",async (req,res) => {
    try{
        const CATEGORY_DATA = await Category.find({_id : req.params.id})
        return res.status(200).json({success : true , Category : CATEGORY_DATA})
    }catch(err){
        return res.status(501).json({success : false , message : err})
    }      
})



router.delete("/delete-Category/:id" , checkerAdmin ,  async (req , res)=>{
    try{
        const isPresent = await Category.findOne({_id : req.params.id})    
        if(isPresent){
            await Category.findByIdAndDelete({_id : req.params.id})
            return res.status(200).json({success : true , message : "Category Deleted Successfully!"})
        }else{
            return res.status(400).json({success : true , message : "Category is not present in the data base!"})
        }
    }catch(err){
        return res.status(501).json({success : false , message : err})
    }
})
router.put("/update-Category/:id" , checkerAdmin ,  async (req , res)=>{
    try{
        const isPresent = await Category.findOne({_id : req.params.id})    
        if(isPresent){
            const New_Category = {
                Name : req.body.Name,
                Admin : req.admin._id,
                Product : req.body.Product || isPresent.Product
            }
            console.log(New_Category)
            await Category.findByIdAndUpdate({_id : req.params.id} , {$set : New_Category})
            return res.status(200).json({success : true , message : "Category updated Successfully!"})
        }else{
            return res.status(400).json({success : true , message : "Error while updating the Category!"})
        }
    }catch(err){
        return res.status(501).json({success : false , message : err})
    }
})
router.get("/category-prod/:prod" ,  async (req , res)=>{
    try{
        const All_Category = await Category.find({Product : req.params.prod})
        return res.status(200).json({success : true , message  : "Here are all the Categorys!" , Categorys : All_Category})
    }catch(err){
        return res.status(501).json({success : false , message : err})
    } 
})
module.exports = router