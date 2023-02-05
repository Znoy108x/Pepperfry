const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const {checkerAdmin , checkerCustomer} = require("../middleware/checker")
const Customer = require("../models/Customer")


const imageStorage = multer.diskStorage({
  destination: "./assets/images/Customers",
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
    if (!file.originalname.match(/\.(png|jpg|JPG|PNG)$/)) {
      return cb(new Error("Only Png / Jpg format is accepted"));
    }
    cb(undefined, true);
  },
});
router.post("/create-user", upload_image.single("image"), async (req, res) => {
  try {
    let isPresent = await User.findOne({ Name: req.body.Email.toLowerCase() });
    if (isPresent !== null) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Admin already present in the data base!",
        });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.Password, salt);
      let data = {
        ...req.body,
        Name: req.body.Name.toLowerCase(),
        Password: hashedPassword,
        Email: req.body.Email.toLowerCase(),
        ProfilePic: "/Customer/Images/" +req.file.filename,
      };
      let Created_Admin = await User.create(data);
      return res
        .status(200)
        .json({
          success: true,
          message: "Successfully created the Admin!",
          Customer: Created_Admin,
        });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: err });
  }
});

const maxAge = 3 * 24 * 60 * 60;
router.post("/login-user", async (req, res) => {
  try {
    let isPresent = await User.findOne({ Email: req.body.Email.toLowerCase() });
    if (isPresent !== null) {
      let cond = await bcrypt.compare(req.body.Password, isPresent.Password);
      if (!cond) {
        return res
          .status(400)
          .json({ success: false, message: "Wrong password!" });
      }
      let Admin_Data = isPresent;
      const payload = {
        Customer: Admin_Data,
      };
      let authToken;
      if (isPresent.Role === "User") {
        authToken = jwt.sign(payload, process.env.ADMIN_JWT_SECRET, {
          expiresIn: maxAge,
        });
      } else {
        authToken = jwt.sign(payload, process.env.CUSTOMER_JWT_SECRET, {
          expiresIn: maxAge,
        });
      }
      res.cookie("ZnoyEcom", authToken, {
        origin:"http://localhost:3001",
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 3,
      });
      res.cookie("Image", isPresent.ProfilePic , {
        maxAge: 1000 * 60 * 60 * 24 * 3,
      });
      res
        .status(200)
        .json({ success: true, message: "Successfully loggedin the Admin!" ,User : Admin_Data});
    } else {
      return res
        .status(500)
        .json({
          success: false,
          message: "Admin not present in the data base!",
        });
    }
  } catch (err) {
    return res
      .status(501)
      .json({ success: false, message: "Error while login the Admin!" });
  }
});

router.get("/user/:id", checkerAdmin ,  async (req, res) => {
  try {
    const User_Data = await User.findOne({_id : req.params.id})
    res.status(200).json({success  :true , Name : User_Data.Name})
  } catch (err) {
    res.status(400).json({ success: false, message: "Please Login!" ,error : err});
  }
});

router.get("/logout" , async (req , res) =>{
  try{
    await res.clearCookie("ZnoyEcom")
    await res.clearCookie("Image")
    res.status(200).json({success : true , message : "Logged out!"})
  }catch(err){
    res.status(400).json({ success: false, message: "Already logged out!" });
  }
})


// customer routes
router.post("/create-customer", async (req, res) => {
  try {
    let isPresent = await Customer.findOne({ Name: req.body.Email.toLowerCase() });
    if (isPresent !== null) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Customer already present in the data base!",
        });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.Password, salt);
      let data = {
        Name: req.body.Name.toLowerCase(),
        Password: hashedPassword,
        Email: req.body.Email.toLowerCase(),
        PhoneNumber : req.body.PhoneNumber,
        PinCode : req.body.PinCode
      };
      let Created_Customer = await Customer.create(data);
      return res
        .status(200)
        .json({
          success: true,
          message: "Successfully created the customer!",
          Customer: Created_Customer,
        });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: err });
  }
});
router.post("/login-customer", async (req, res) => {
  try {
    let isPresent = await Customer.findOne({ Email: req.body.Email.toLowerCase() });
    if (isPresent !== null) {
      let cond = await bcrypt.compare(req.body.Password, isPresent.Password);
      if (!cond) {
        return res
          .status(400)
          .json({ success: false, message: "Wrong password!" });
      }
      let Customer_Data = isPresent;
      const payload = {
        Customer: Customer_Data,
      };
      const authToken = jwt.sign(payload, process.env.CUSTOMER_JWT_SECRET, {
        expiresIn: maxAge,
      });
      res.cookie("ClientSideJWT", authToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 3,
      }).cookie("ClientSideTracker", true, {
        maxAge: 1000 * 60 * 60 * 24 * 3,
      })
      res
        .status(200)
        .json({ success: true, message: "Successfully loggedin the Customer!" , Customer : Customer_Data});
    } else {
      return res
        .status(500)
        .json({
          success: false,
          message: "Customer not present in the data base!",
        });
    }
  } catch (err) {
    return res
      .status(501)
      .json({ success: false, message: "Error while login the customer!" });
  }
});


router.get("/loginCustomer", checkerCustomer , async (req, res) => {
  try {
    res.status(200).json({message : true , cookie : req.cookies.ClientSideTracker})
  } catch (error) {
    res.status(400).json({message : false  , cookie : 0})    
  }
});


router.get("/logoutCustomer" , async (req , res) =>{
  try{
    await res.clearCookie("ClientSideJWT")
    await res.clearCookie("ClientSideTracker")
    res.status(200).json({success : true , message : "Logged out!"})
  }catch(err){
    res.status(400).json({ success: false, message: "Already logged out!" });
  }
})


module.exports = router;