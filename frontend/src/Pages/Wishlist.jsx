import React, { useEffect, useState , useContext } from 'react'
import Navbar from "../Components/Navbar"
import { useNavigate } from 'react-router-dom'
import Loader from '../Components/Loader';
import FooterMain from "../Components/FooterMain"
import EcomContext from '../Context/EcomContext'
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { UilShare } from '@iconscout/react-unicons'
import empty from "../assets/empty.png"

const Wishlist = () => {
    const { HANDLE_ADD_TO_CART , HANDLE_ADD_TO_WISHLIST , CHECK_PROD_IN_LOCAL_STORAGE} = useContext(EcomContext)
    const navigate = useNavigate()
    const [loading, setloading] = useState(false)
    const [wishLst, setwishLst] = useState([])
    const Local_Data = () =>{
        const WishListData = JSON.parse(localStorage.getItem("Wishlist"))
        if (WishListData !== {}) {
            setwishLst(WishListData)
        }
    }
    useEffect(() => {
        Local_Data()
    }, [])

    const HANDLE_REMOVE_FUNC = (prod) =>{
        HANDLE_ADD_TO_WISHLIST(prod)
        Local_Data()
    }

    return (
        <>
            {
                loading ? <Loader /> :
                    <div className="w-full min-h-screen flex flex-col font-Baby_PlayFair ">
                        <Navbar loading={loading} setloading={setloading} />
                        <div className="w-full ">
                            <h1 className="text-4xl text-center mt-2">Wishlist</h1>
                            <div className="w-full h-full flex flex-wrap px-10 gap-x-10 pt-10 gap-y-10 pb-20 justify-center">
                                { 
                                Object.entries(wishLst).length >0 ? Object.entries(wishLst).map(([key, val], i) => (
                                    <div key={i} className="shadow-2xl w-1/4 p-6  flex flex-col h-4/5 rounded-2xl cursor-pointer relative" >
                                        <img src={`http://localhost:5000${wishLst[key].Image}`} alt="" className="rounded-lg h-[60%]" />
                                        <span className="text-xl font-semibold mt-3">{wishLst[key].Name}</span>
                                        <span className="flex space-x-2 items-center font-Baby_Urbanist mt-3">
                                            <span className="text-2xl text-gray-800 font-bold">₹{Math.ceil(wishLst[key].Price - wishLst[key].Price * wishLst[key].Discount / 100)}</span>
                                            <span className="text-green-500 font-bold text-sm">( {wishLst[key].Discount}% ) Off</span>
                                        </span>
                                        <span className="flex space-x-7 items-center font-Baby_Urbanist mt-2">
                                            <span className="">Save ₹ {Math.ceil(wishLst[key].Price * wishLst[key].Discount / 100)}</span>
                                            <span className="line-through text-gray-800">MRP ₹{wishLst[key].Price}</span>
                                        </span>
                                        <div className="flex w-full justify-center mt-2 space-x-2">
                                            <button onClick={()=>navigate(`/${wishLst[key].Name.split(" ").join("-")}/detail` ,{state : {Items_datail : wishLst[key]}})} className="   bg-teal-400 text-teal-100 rounded-full p-2 hover:scale-110 duration-300"><UilShare/></button>

                                            <button onClick={()=>HANDLE_REMOVE_FUNC(wishLst[key])} className="   bg-baby_orange2 text-orange-100 rounded-full p-2 hover:scale-110 duration-300">
                                                <DeleteOutlinedIcon/>
                                            </button>
                                        </div>
                                    </div>
                                ))  : <div className="w-full h-full flex items-center justify-center">
                                        <lottie-player src="https://assets1.lottiefiles.com/private_files/lf30_e3pteeho.json"  background="transparent"  speed="1"  style={{width: "500px" , height: "500px"}}  loop autoplay></lottie-player>
                                </div>
                            }
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}
export default Wishlist