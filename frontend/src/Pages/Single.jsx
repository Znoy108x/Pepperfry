import React, { useEffect, useState, useContext } from 'react'
import Navbar from "../Components/Navbar"
import { useLocation, useNavigate } from "react-router-dom"
import FooterMain from "../Components/FooterMain"
import { Carousel } from "flowbite-react"
import LoaderTwo from "../Components/LoaderTwo"
import EcomContext from '../Context/EcomContext'
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
const Single = () => {
  const { HANDLE_ADD_TO_CART, HANDLE_ADD_TO_WISHLIST, CHECK_PROD_IN_LOCAL_STORAGE } = useContext(EcomContext)
  const [singleEle, setsingleEle] = useState([])
  const location = useLocation()
  const [loading, setLoading] = useState(true)
  const [isWish, setIsWish] = useState(0)
  const navigate = useNavigate()

  const Handle_Wish = (prod) => {
    HANDLE_ADD_TO_WISHLIST(prod)
    setIsWish(CHECK_PROD_IN_LOCAL_STORAGE(singleEle))
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
    setsingleEle(location.state.Items_datail)
  }, [])
  useEffect(() => {
    setIsWish(CHECK_PROD_IN_LOCAL_STORAGE(singleEle))
  }, [singleEle])


  const offers = [
    { h1: "Extra 5% Off On HDFC Bank CardsCode: HDFCPF2", h2: "Get Additional 5% Off up to Rs.1500 on minimum purchase of Rs. 2000 on HDFC Bank Cards and EMI transactions." },
    { h1: "Extra 5% Off On HDFC Bank CardsCode: HDFCPF3", h2: "Get Additional 5% Off up to Rs.3000 on minimum purchase of Rs.5000 on HDFC Bank Cards and EMI transactions." },
    { h1: "Extra 5% Off On HDFC Bank CardsCode: HDFCPF5", h2: "Get Additional 5% Off up to Rs.5000 on minimum purchase of Rs.5000 on HDFC Bank Cards and EMI transactions ." },
    { h1: "Extra 5% off on Citi Bank Debit and Credit", h2: "cardCode: CITIPF20 Get an Additional 5% off up to Rs.1000 on CITI Bank Credit Card and Debit Card" },
    { h1: "Extra 5% Off On AXIS Bank CardsCode: AXISPF5", h2: "Get Additional 5% Off up to Rs.5000 on minimum purchase of Rs.5000 on AXIS Bank Cards." },
    { h1: "Extra 7% off on Mastercard Debit and Credit", h2: "cardsCode: MASTERVPF7 Get additional 7% off up to Rs 1500 on a minimum purchase of Rs. 5000 on selected MasterCard Credit and Debit cards" },
    { h1: "Extra 7% Off On VISA Debit & Credit", h2: "CardsCode: VISAPF7 Get Additional 7% Off up to Rs.1500 on minimum purchase of Rs.5000 on VISA Credit & Debit Cards." },
    { h1: "Extra 5% Off On AXIS Bank CardsCode: AXISPF2", h2: " Get Additional 5% Off up to Rs.1500 on minimum purchase of Rs.2000 on AXIS Bank Cards." }
  ]

  return (
    <>
      {
        loading ? <LoaderTwo /> : <div className="w-full flex flex-col font-Baby_Urbanist">
          <Navbar />
          <div className='w-full min-h-screen px-20 mt-8 flex justify-between '>
            <div className="w-1/2  h-[90vh] shadow-2xl p-3 rounded-xl">
              <div className="h-full  w-full sm:h-64 xl:h-80 2xl:h-full">
                <Carousel slideInterval={5000}>
                  <img src={`http://localhost:5000${singleEle.Image}`} alt="..." className="w-full h-full object-cover" />
                  {
                    singleEle.MainImage.map((ele) => (
                      <img src={`http://localhost:5000${ele}`} alt="..." className="w-full h-full object-cover " key={ele} />
                    ))
                  }
                </Carousel>
              </div>
            </div>
            <div className="w-1/2 p-8 flex flex-col space-y-3 realtive">
              <div className="flex justify-between">
                <span className="text-2xl font-medium tracking-wider">{singleEle.Name}</span>
                {
                  isWish ? <FavoriteOutlinedIcon className="text-xl text-baby_orange2 cursor-pointer" onClick={() => Handle_Wish(singleEle)} /> : <FavoriteBorderOutlinedIcon className="text-xl hover:text-baby_orange2 cursor-pointer" onClick={() => Handle_Wish(singleEle)} />
                }
              </div>
              <span>12 Months <span className="text-baby_orange2">Warranty</span></span>
              <span className="flex space-x-7 items-center">
                <span className="text-3xl text-gray-900 font-bold">₹{Math.ceil(singleEle.Price - singleEle.Price * singleEle.Discount / 100)}</span>
                <span className="text-green-400 font-bold text-lg">( {singleEle.Discount}% ) Off</span>
              </span>
              <span className="flex space-x-7 items-center">
                <span className="">Save ₹ {Math.ceil(singleEle.Price * singleEle.Discount / 100)}</span>
                <span className="line-through text-gray-800">MRP ₹{singleEle.Price}</span><span>
                  (Inc all Taxes)
                </span>
              </span>
              <p className="font-light">{singleEle.Description}</p>
              <img src="https://ii2.pepperfry.com/media/wysiwyg/banners/Promo_a1_b1_c1_Web_VIPCouponWeekendMania_2X_1311_ET.jpg" alt="" />
              <div className="flex space-x-3 w-full items-center h-[100px]">
                <button className="w-[30%] bg-baby_orange2 text-white rounded-lg shadow-xl px-5 py-3 duration-300 hover:scale-105 " onClick={() => navigate("/Address", {
                  state: {
                    Cart: [singleEle], TotalPrice: singleEle.Price
                  }
                })}>Buy Now</button>
                <button className="w-[30%] bg-white text-gray-900 rounded-lg border-2 border-gray-700 shadow-xl px-5 py-3 hover:scale-105 duration-300" onClick={() => HANDLE_ADD_TO_CART(singleEle)}>Add To Cart</button>
              </div>
              <div className="flex space-x-10 pl-2 ">
                <span className="text-md">Delivery</span>
                <div className="w-[65%] flex flex-col space-y-3">
                  <span className="font-light text-xs">
                    Enter Pincode to get Delivery Date, Assembly Information and other details</span>
                  <div className="w-[75%] bg-gray-100 flex items-center rounded-md pr-3">
                    <input type="number" className="w-full h-12 bg-gray-100 px-6 py-1 text-baby_orange2 outline-none tracking-widest border-none focus:border-none active:border-none" placeholder="Enter the pincode " />
                    <span className="text-xl text-baby_orange2 font-semibold">Change</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between pl-3 ">
                <span>Offers</span>
                <div className='flex flex-col space-y-4 w-[85%] overflow-y-scroll h-[300px] scrollbar-thin scrollbar-thumb-baby_orange2 scrollbar-track-orange-50 scrollbar-thumb-rounded-full scrollbar-track-rounded-ful pr-2'>
                  {
                    offers.map((ele) => (
                      <div className="flex flex-col pr-5" key={ele.h1}>
                        <span className="text-sm font-medium text-gray-900">{ele.h1}</span>
                        <span className="text-sm text-gray-800" >{ele.h2}</span>
                      </div>
                    ))
                  }
                </div>
              </div>
              <div className="flex space-x-9 pl-4">
                <span>
                  Details
                </span>
                <span className="flex space-x-3">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-800 font-medium">Product ID</span>
                    <span className="text-xs text-gray-700">{singleEle.ManufacturingId}</span>
                  </div>
                  <div className="flex flex-col ">
                    <span className="text-sm text-gray-800 font-medium">Manufactured Date</span>
                    <span className="text-xs text-gray-700">{singleEle.ManufacturingDate}</span>
                  </div>
                </span>
              </div>
            </div>
          </div>
          <FooterMain />
        </div>
      }
    </>

  )
}
export default Single