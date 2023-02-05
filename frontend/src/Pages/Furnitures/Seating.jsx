import React, { useState, useEffect , useContext} from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import Navbar from "../../Components/Navbar"
import Seating_Img from "../../assets/ProductBanners/Seating.jpg"
import axios from "axios"
import Filters from "../../Components/Filters"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import Footer from "../../Components/Footer"
import EcomContext from "../../Context/EcomContext"


const Seating = () => {
  const navigate = useNavigate()
  const { HANDLE_ADD_TO_CART , HANDLE_ADD_TO_WISHLIST , CHECK_PROD_IN_LOCAL_STORAGE} = useContext(EcomContext)
  const [liked , setLiked] = useState(false)
  const location = useLocation()
  const [items , setItems] = useState([])
  
  const FETCH_ALL_Cats = (id) =>{
      axios.get(`http://localhost:5000/api/item_by_cat/${id}`).then((res) =>{
        setItems(res.data.items_by_cats)
      }).catch((err)=>{
        console.log(err)
      })
    }
  useEffect(() =>{
    FETCH_ALL_Cats(location.state.category._id)
  },[])

  return (
    <div className="w-full flex flex-col">
      <Navbar />
      <div className="px-20 w-full mt-7 flex flex-col">
        <img src={Seating_Img} alt="" className="w-full h-[300px] object-cover" />
        <h1 className="text-center text-8xl font-dancing my-10       text-gray-900">Seating</h1>
        <div className="w-full min-h-screen flex ">
          <div className="w-1/5 h-full pt-10">
            <Filters/>
          </div>
          <div className="w-4/5 h-full flex flex-wrap gap-x-9 font-sans p-10   gap-y-9 ">
            {
              items.map((ele) => (
                  <div className="w-[29%] h-[68%] flex flex-col cursor-pointer relative group " key={ele._id} >
                    <div className="w-full h-[80%] overflow-hidden" onClick={()=>navigate(`/${ele.Name.split(" ").join("-")}/detail` ,{state : {Items_datail : ele}})}>
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
      <Footer/>
    </div>
  )
}
export default Seating