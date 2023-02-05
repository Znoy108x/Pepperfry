import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import Navbar from "../Components/Navbar"
import axios from "axios"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import Filters from "../Components/Filters"

const BestDeals = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [BestProd, setBestDealProd] = useState([])
  useEffect(() => {
    axios.get(`http://localhost:5000/api/BestDeals/${location.state.details.discount}`).then((res) => {
      console.log()
      setBestDealProd(res.data.Items)
    }).catch((err) => {
      console.log(err)
    })
  }, []);

  const [liked , setLiked] = useState(false)
  const [fromBest , setFromBest] = useState(true)


  return (
    <div className="w-full flex flex-col">
      <Navbar />
      <div className="px-20  w-full min-h-screen flex ">
          <div className="w-1/5 h-full pt-10">
            <Filters fromBest={fromBest}/>
          </div>
          <div className="w-4/5 h-full flex flex-wrap gap-x-9 font-sans p-10   gap-y-9 ">
            {
              BestProd.map((ele) => (
                  <div className="w-[29%] h-[68%] flex flex-col cursor-pointer relative group " key={ele._id} onClick={()=>navigate(`/${ele.Name.split(" ").join("-")}/detail` ,{state : {Items_datail : ele}})}>
                    {
                      liked === ele._id ? <FavoriteIcon className="absolute top-3 left-3 hover:scale-100 duration-200 z-50 text-pepperfry" onClick={()=>setLiked("")}/>: 
                      <FavoriteBorderIcon className="absolute top-3 left-3 hover:scale-100 duration-200 z-50 hover:text-pepperfry" onClick={()=>setLiked(ele._id)}/>
                    }
                    <span className="absolute top-3 right-3 z-50 group-hover:opacity-100 opacity-0 duration-200 hover:text-baby_orange2 cursor-pointer">
                      <ShoppingCartCheckoutOutlinedIcon />
                    </span>
                    <div className="w-full h-[80%] overflow-hidden">
                      <img src={`http://localhost:5000${ele.Image}`} alt="" className="w-full h-full object-cover hover:scale-110 duration-300"/>
                    </div>
                    <div className="flex flex-col space-y-1 mt-5">
                      <span className="text-lg font-gray-900">{ele.Name}</span>
                      <span className="text-baby_orange2 font-bold text-2xl space-x-3">
                        <span>₹ {Math.trunc(ele.Price - ele.Price * (ele.Discount / 100))}</span>
                        <span className="text-lg text-gray-500 line-through font-light">({ele.Price})</span></span>
                      <span className="text-green-600 text-lg font-bold">{ele.Discount}% Off</span>
                      <span className="text-gray-700 font-medium text-xs">Ships in 3 Days</span>
                    </div>
                  </div>
              ))
            }
          </div>
        </div>
    </div>
  )
}

export default BestDeals