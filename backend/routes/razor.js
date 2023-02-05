const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const { checkerCustomer } = require("../middleware/checker");
const crypto = require("crypto");
const Order = require("../models/Orders")


const instance = new Razorpay({
  key_id: process.env.RAZOR_API_KEY,
  key_secret: process.env.RAZOR_SECRET_KEY,
});
router.post("/razor/PayInit", checkerCustomer, async (req, res) => {
  const options = {
    amount: req.body.amount * 100,
    currency: "INR",
  };
  const order = await instance.orders.create(options);
  res.status(200).json({ success: true, Order: order });
});

router.post("/razor/PayVerification", async (req, res) => {
  try {
    const {razorpay_payment_id , razorpay_order_id ,razorpay_signature } = req.body.res
    const body  = razorpay_order_id + "|" + razorpay_payment_id
    const code = crypto.createHmac('sha256',process.env.RAZOR_SECRET_KEY).update(body.toString()).digest('hex')
    if(code === razorpay_signature){
      let items = req.body.cart;
      for(let i = 0 ;i< items.length ;i++){
        items[i].tracking = "Order Placed"
      } 
      const data = {
        Customer : req.body.customer_id,
        Items : items
      }
      await Order.create(data).then(()=>{
        return res.status(200).json({ success: true , message : "Payment Done Successfully!"});
      }).catch((err)=>{
        return res.status(400).json({ success: false , message : err});
      })
    }else{
      res.status(500).json({ success: false  , message : "Invalid Order"});
    }
  } catch (err) {
    res.status(501).json({ success: false , message : "Technical Error!"});
  }
});

router.get("/razor/getKey", checkerCustomer, async (req, res) => {
  try {
    res.status(200).json({ success: true, Key: process.env.RAZOR_API_KEY });
  } catch (err) {
    return res.status(501).json({ success: false, error: err });
  }
});

module.exports = router;
