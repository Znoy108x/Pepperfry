import React, { useState, useEffect } from 'react'
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import axios from "axios"
import {toast} from "react-toastify"
const Address = () => {
  const navigate = useNavigate()
  const [cart, setCart] = useState([])
  const [CustomerData, setCustomerData] = useState()
  const location = useLocation()
  useEffect(() => {
    let data = location.state.Cart;
    let customerData = JSON.parse(localStorage.getItem("CustomerData"))
    setCustomerData(customerData)
    setCart(data)
  }, []);
  const [addressData, setAddressData] = useState({
    FirstName: "",
    LastName: "",
    PhoneNumber: "",
    HomeAddress: "",
    StreetAddress: "",
    City: "",
    PhoneNumber: "",
    ZipCode: ""
  })
  const PROCEED_PAYMENT_HANDLER = async () => {
    console.log(CustomerData)
    console.log(cart)
    const { data : {Order} } = await axios.post("http://localhost:5000/api/razor/PayInit", { amount: location.state.TotalPrice }, { withCredentials: true })
    const { data : {Key}} = await axios.get("http://localhost:5000/api/razor/getKey", { withCredentials: true })
    const options = {
      "key": Key,
      "amount": Order.amount,
      "currency": "INR",
      "name": "Pepper Fry Payment Page",
      "description": "Order Payment",
      "image": "https://cdn.icon-icons.com/icons2/3310/PNG/96/library_books_school_shelving_rack_furniture_icon_209277.png",
      "order_id": Order.id,
      "handler": async function (res){ 
        await axios.post("http://localhost:5000/api/razor/PayVerification" , {res , cart : cart , customer_id : CustomerData._id }).then((res)=>{
          toast.success(res.data.message)
          localStorage.setItem("Cart" , [])
          navigate("/Profile")
        }).catch((err)=>{
          toast.error(err.response.data.message)
        })
      },
      "prefill": {
        "name": CustomerData.Name,
        "email": CustomerData.Email,
        "contact": CustomerData.PhoneNumber
      },
      "notes": {
        "address": "Razorpay Corporate Office"
      },
      "theme": {
        "color": "#E85B45"
      }
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open()
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-slate bg-[#f1f5f9]">
      <div className="w-[90%] h-[90%]  flex justify-between">
        <div className="w-[60%] bg-white shadow-xl rounded-md p-5 ">
          <span className=" flex space-x-5">
            <span className="rounded-full flex items-center justify-center cursor-pointer group hover:bg-indigo-600 duration-300 w-10 h-10 hover:text-white" onClick={() => navigate("/Cart")}>
              <ArrowBackRoundedIcon fontSize="large" className="group-hover:text-white duration-300" />
            </span>
            <span className="text-4xl font-medium font-Baby_PlayFair">
              Address Details
            </span>
          </span>
          <div className="w-full h-[80%] grid grid-cols-2 gap-y-12 gap-x-10 pt-10 font-Baby_Urbanist content-start ">
            <span className="flex flex-col space-y-2">
              <span className="text-sm font-bold tracking-wider text-gray-900">FIRST NAME</span>
              <input type="text" placeholder='First Name' className="rounded-sm" name="FirstName" value={addressData.FirstName} onChange={(e) => setAddressData({ ...addressData, [e.target.name]: e.target.value })} />
            </span>
            <span className="flex flex-col space-y-2">
              <span className="text-sm font-bold tracking-wider text-gray-900">LAST NAME</span>
              <input type="text" placeholder='Last Name' className="tracking-wider" name="LastName" value={addressData.LastName} onChange={(e) => setAddressData({ ...addressData, [e.target.name]: e.target.value })} />
            </span>
            <span className="flex flex-col space-y-2">
              <span className="text-sm font-bold tracking-wider text-gray-900">PHONE NUMBER</span>
              <input type="text" placeholder='+91-xxxxxxxxxx' className="tracking-wider" name="PhoneNumber" value={addressData.PhoneNumber} onChange={(e) => setAddressData({ ...addressData, [e.target.name]: e.target.value })} />
            </span>
            <span className="flex flex-col space-y-2 col-span-3">
              <span className="text-sm font-bold tracking-wider text-gray-900">HOME ADDRESS</span>
              <input type="text" placeholder='House Number and Society' className="tracking-wider" name="HomeAddress" value={addressData.HomeAddress} onChange={(e) => setAddressData({ ...addressData, [e.target.name]: e.target.value })} />
            </span>
            <span className="flex flex-col space-y-2 col-span-3">
              <span className="text-sm font-bold tracking-wider text-gray-900">STREET ADDRESS</span>
              <input type="text" placeholder='Street Name / Street Number / Landmark' className="tracking-wider" name="StreetAddress" value={addressData.StreetAddress} onChange={(e) => setAddressData({ ...addressData, [e.target.name]: e.target.value })} />
            </span>
            <span className="flex flex-col space-y-2">
              <span className="text-sm font-bold tracking-wider text-gray-900">CITY</span>
              <input type="text" placeholder='City' className="tracking-wider" name="City" value={addressData.City} onChange={(e) => setAddressData({ ...addressData, [e.target.name]: e.target.value })} />
            </span>
            <span className="flex flex-col space-y-2">
              <span className="text-sm font-bold tracking-wider text-gray-900">ZIP CODE</span>
              <input type="text" placeholder='000000' className="tracking-wider" name="ZipCode" value={addressData.ZipCode} onChange={(e) => setAddressData({ ...addressData, [e.target.name]: e.target.value })} />
            </span>
          </div>

        </div>
        <div className="w-[35%] h-[85%] flex flex-col bg-white rounded-md p-5 shadow-xl ">
          <span className="text-4xl font-medium font-Baby_PlayFair">Order Summary</span>
          <div className="w-full flex flex-grow flex-col space-y-3 mt-10 overflow-y-scroll scrollbar-hide ">
            {
              cart.map((ele) => (
                <div className="w-full flex " key={ele.Name}>
                  <img src={`http://localhost:5000${ele.Image}`} alt="" className="w-20 h-20 rounded-full object-cover" />
                  <div className="flex flex-col ml-7 h-full  justify-center">
                    <span className="tetx-xl font-Baby_PlayFair">{ele.Name}</span>
                    <span className="tetx-sm font-Baby_Urbanist font-semibold tracking-wider">₹ {Math.ceil(ele.Price - ele.Price * ele.Discount / 100)}</span>
                  </div>
                </div>
              ))
            }
          </div>
          <button className="mt-10 px-2 py-2 bg-indigo-600 text-white rounded-md duration-300 active:scale-95 hover:bg-cyan-600"
            onClick={PROCEED_PAYMENT_HANDLER}>Proceed To Pay</button>
        </div>
      </div>
    </div>
  )
}
export default Address