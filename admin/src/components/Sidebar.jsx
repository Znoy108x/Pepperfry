import React, { useContext, useState, useEffect } from 'react'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import PrecisionManufacturingOutlinedIcon from '@mui/icons-material/PrecisionManufacturingOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import AutoAwesomeMotionOutlinedIcon from '@mui/icons-material/AutoAwesomeMotionOutlined';
import Nike from "../assets/nike.png"
import PanelContext from "../context/PanelContext"
import { useNavigate } from 'react-router-dom';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import axios from "axios"
import { toast } from "react-toastify"

const Sidebar = ({ setSubHome }) => {
  const navigate = useNavigate()
  const [userImg, setuserImg] = useState("")
  const { user, setUser, admin } = useContext(PanelContext);
  const [display, setDisplay] = useState(false)
  const LOGOUT_USER = () => {
    axios.get("http://localhost:5000/api/logout", { withCredentials: true }).then((res) => {
      setUser(false)
      localStorage.removeItem("UserData")
      navigate("/login")
    }).catch((err) => {
      toast.error(err.response.data.message)
    })
  }

  return (
    <div className="h-full w-[15%] bg-baby_orange relative text-baby_gray">
      <div className='h-[12%]  flex justify-center items-center space-x-3 cursor-pointer ' onClick={() => navigate("/")}>
        <span className="text-4xl font-bold font-dancing">Admin Panel</span>
      </div>
      <div className="h-[72%] flex flex-col items-center py-6 space-y-6">
        <div className="flex flex-col">
          <span className="mb-5   font-semibold tracking-wide ">Products</span>
          <span className="flex items-center space-x-5   cursor-pointer hover:bg-orange-200 hover:text-baby_orange2 w-[160px] p-1 rounded-lg" onClick={() => navigate("/all-products")} ><ShoppingBagOutlinedIcon className="" /> <span>All Product</span></span>
          <span className="flex items-center space-x-5   cursor-pointer hover:bg-orange-200 hover:text-baby_orange2 w-[160px] p-1 rounded-lg  mt-2" onClick={() => navigate("/add-product")}><PrecisionManufacturingOutlinedIcon className=" " /><span>Add Product</span></span>
        </div>
        <div className="flex flex-col">
          <span className="mb-5   font-semibold tracking-wide ">Categories</span>
          <span className="flex items-center space-x-5   cursor-pointer hover:bg-orange-200 hover:text-baby_orange2 w-[160px] p-1 rounded-lg" onClick={() => navigate("/all-categories")}><CategoryOutlinedIcon className=" " /> <span>All Categories</span></span>
          <span className="flex items-center space-x-5   cursor-pointer hover:bg-orange-200 hover:text-baby_orange2 w-[160px] p-1 rounded-lg mt-2" onClick={() => navigate("/add-categories")}><AutoAwesomeMotionOutlinedIcon className=" " /><span>Add Category</span></span>
        </div>
        <div className="flex flex-col">
          <span className="mb-5   font-semibold tracking-wide ">Items</span>
          <span className="flex items-center space-x-5   cursor-pointer hover:bg-orange-200 hover:text-baby_orange2 w-[160px] p-1 rounded-lg" onClick={() => navigate("/all-items")}><AddShoppingCartOutlinedIcon className=" " /> <span>All Items</span></span>
          <span className="flex items-center space-x-5   cursor-pointer hover:bg-orange-200 hover:text-baby_orange2 w-[160px] p-1 rounded-lg mt-2" onClick={() => navigate("/add-items")}><AccountTreeOutlinedIcon className=" " /><span>Add Item</span></span>
        </div>
        <div className="flex flex-col">
          <span className="mb-5   font-semibold tracking-wide ">Tracking</span>
          <span className="flex items-center space-x-5   cursor-pointer hover:bg-orange-200 hover:text-baby_orange2 w-[160px] p-1 rounded-lg" onClick={() => navigate("/all-orders")}><LocalShippingOutlinedIcon className=" " /> <span>Orders</span></span>
        </div>
      </div>
      <div className="absolute bottom-4 w-full flex flex-col space-y-2 items-center">
        <span className="flex bg-orange space-x-3 items-center  text-white cursor-pointer px-4 py-2 text-sm duration-300 active:scale-75 bg-baby_orange2 rounded-lg w-3/5 justify-center hover:bg-orange-800">
          <LogoutOutlinedIcon fontSize="small" />
          <span onClick={LOGOUT_USER}>Logout</span>
        </span>
      </div>
    </div>
  )
}
export default Sidebar