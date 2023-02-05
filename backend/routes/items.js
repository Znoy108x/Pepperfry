const express = require("express");
const router = express.Router();
const { checkerAdmin } = require("../middleware/checker");
const Item = require("../models/Items");
const Category = require("../models/Category")


const multer = require("multer");
fs = require("fs");
const imageStorage = multer.diskStorage({
  destination: "./assets/images/Items",
  filename: (req, file, cb) => {
    cb(
      null,
      file.originalname.split(".")[0] +
        "-" +
        Date.now() +
        "." +
        file.originalname.split(".")[1]
    );
  },
});

const upload_image = multer({
  storage: imageStorage,
  limits: {
    fileSize: 10000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|JPG|PNG|webp|WEBP)$/)) {
      return cb(new Error("Only Png / Jpg / Webp format is accepted"));
    }
    cb(undefined, true);
  },
});

router.post("/create-items", checkerAdmin , upload_image.fields([{ name: "MainImage", maxCount: 4 },{ name: "Image", maxCount: 1 }]),
  async (req, res) => {
    try {
      const MainImageList = [];
      req.files.MainImage.map((ele) => {
        MainImageList.push("/Items/Images/" + ele.filename);
      });
      await Item.create({
        ...req.body,
        MainImage: MainImageList,
        Image: "/Items/Images/" + req.files.Image[0].filename,
        Admin: req.admin._id,
      });
      res
        .status(200)
        .json({ success: true, message: "Item created successfully !" });
    } catch (err) {
      res.status(500).json({ success: false, message: "Cannot add a item !" });
    }
  }
);

router.get("/all-items", async (req, res) => {
  try {
    const All_Products = await Item.find({});
    res.status(200).json({ success: true, message: All_Products });
  } catch (err) {
    res.status(501).json({ success: false, message: err });
  }
});

router.get("/new_arrivals/:id", async (req, res) => {
  try {
    const All_Products = await Item.find({});
    res.status(200).json({ success: true, message: All_Products });
  } catch (err) {
    res.status(501).json({ success: false, message: err });
  }
});

router.get("/item_by_cat/:id", async (req, res) => {
  try {
    const All_Items_By_Cats = await Item.find({Category : req.params.id});
    res.status(200).json({ success: true, items_by_cats: All_Items_By_Cats });
  } catch (err) {
    res.status(501).json({ success: false, message: err });
  }
});


router.get("/all-item/:id", async (req, res) => {
  try {
    const All_Products = await Item.find({ _id: req.params.id });
    res.status(200).json({ success: true, item: All_Products });
  } catch (err) {
    res.status(501).json({ success: false, message: err });
  }
});

router.delete("/delete-item/:id", checkerAdmin, async (req, res) => {
  try {
    const isPresent = await Item.findOne({ _id: req.params.id });
    if (isPresent) {
      await Item.findByIdAndDelete({ _id: req.params.id });
      return res
        .status(200)
        .json({ success: true, message: "Item Deleted Successfully!" });
    } else {
      return res.status(400).json({
        success: true,
        message: "Item is not present in the data base!",
      });
    }
  } catch (err) {
    return res.status(501).json({ success: false, message: err });
  }
});

router.put(
  "/update_item/:id",
  checkerAdmin,
  upload_image.fields([
    { name: "MainImage", maxCount: 4 },
    { name: "Image", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const isPresent = await Item.findOne({ _id: req.params.id });
      if (isPresent) {
        const MainImageList = [];
        if(req.files.MainImage !== undefined){
          req.files.MainImage.map((ele) => {
            MainImageList.push("/Items/Images/" + ele.filename);
          });
        }
        const New_Item = {
          Name: req.body.Name!== "undefined" ? req.body.Name  :  isPresent.Name,
          Product: req.body.Product !== "undefined" ? req.body.Product  :  isPresent.Product,
          Category: req.body.Category !== "undefined" ? req.body.Category  :  isPresent.Category,
          Price: req.body.Price !== "undefined" ? req.body.Price  :  isPresent.Price,
          Discount: req.body.Discount !== "undefined" ? req.body.Discount  :  isPresent.Discount,
          Image: req.files.Image !== undefined ? "/Items/Images/" + req.files.Image[0].filename : isPresent.Image ,
          MainImage: req.files.MainImage !==  undefined ? MainImageList : isPresent.MainImageList,
          Description: req.body.Description !== "undefined" ? req.body.Description  :  isPresent.Description,
          ManufacturingId:
            req.body.ManufacturingId !== "undefined" ? req.body.ManufacturingId  :  isPresent.ManufacturingId,
          ManufacturingDate:
            req.body.ManufacturingDate !== "undefined" ? req.body.ManufacturingDate  :  isPresent.ManufacturingDate,
          Colors: req.body.Colors || isPresent.Colors,
          Size: req.body.Size !== "undefined" ? req.body.Size  :  isPresent.Size,
          Gender: req.body.Gender !== "undefined" ? req.body.Gender  :  isPresent.Gender,
        };
        const Updated_Item = await Item.findByIdAndUpdate(
          { _id: req.params.id },
          { $set: New_Item },
          { new: true }
        );
        return res.status(200).json({ success: true, message: Updated_Item });
      }
    } catch (err) {
      res
        .status(500)
        .json({ success: false, message: "Cannot update a item !" });
    }
  }
);

router.get("/BestDeals/:id" , async (req, res) =>{
  console.log(Number(req.params.id))
  const DiscountData = await Item.find({Discount : Number(req.params.id)})
  res.status(200).json({status : true , Items : DiscountData}) 
})

router.delete("/delete-image/:imagename", (req, res) => {
  try{
    const file_location = "assets/images/Items/" + req.params.imagename;
    fs.unlinkSync(file_location);
    res.status(200).json({success : true , message : "Image deleted !"})
  }catch(err){
    res.status(400).json({success : false , message : "Cannot delete the image !"})
  }
});


router.get("/product-page/:prodId" , async (req , res) =>{
  try{
    const data_lst = []
    const Categories_Prod = await Category.find({Product : req.params.prodId})
    for(let j = 0 ;j<Categories_Prod.length;j++){
      let ele = Categories_Prod[j];
      let Item_Prod = await Item.find({Category : ele._id , Product : req.params.prodId}).sort({ _id: -1 }).limit(4)
      let json_data = {
        Name : ele.Name,
        Id : ele._id,
        Data : Item_Prod
      }
      await data_lst.push(json_data)
    }
    return res.status(200).json({success : true , data : data_lst})
  }catch(err){
    return res.status(500).json({success : false , error : err})
  }
})
module.exports = router;