import React, { useEffect, useState, useContext } from 'react'
import Navbar from "../Components/Navbar"
import { useNavigate } from 'react-router-dom'
import Loader from '../Components/Loader';
import FooterMain from "../Components/FooterMain"
import EcomContext from '../Context/EcomContext'
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { UilShare } from '@iconscout/react-unicons'
import empty from "../assets/empty.png"

const Cart = () => {
    const { HANDLE_ADD_TO_CART, HANDLE_ADD_TO_WISHLIST, CHECK_PROD_IN_LOCAL_STORAGE } = useContext(EcomContext)
    const [subTotal, setSubTotal] = useState(0)
    const navigate = useNavigate()
    const [loading, setloading] = useState(false)
    const [cartLst, setcartLst] = useState([])
    const Cart_Data = () => {
        const CartLstData = localStorage.getItem("Cart") ? JSON.parse(localStorage.getItem("Cart")) : []
        console.log(CartLstData)
        if (CartLstData !== []) {
            let newPrice = 0
            for (let i = 0; i < CartLstData.length; i++) {
                let price = Math.ceil(CartLstData[i].Price - CartLstData[i].Price * CartLstData[i].Discount / 100)
                newPrice += price;
            }
            setSubTotal(newPrice)
            setcartLst(CartLstData)
        }else{
            setSubTotal(0)
        }
    }
    useEffect(() => {
        Cart_Data()
    }, [])

    const HANDLE_REMOVE_FUNC = (prod) => {
        HANDLE_ADD_TO_CART(prod)
        Cart_Data()
    }

    return (
        <>
            {
                loading ? <Loader /> :
                    <div className="w-full min-h-screen flex flex-col font-Baby_PlayFair ">
                        <Navbar loading={loading} setloading={setloading} />
                        <div className="w-full ">
                            <h1 className="text-4xl text-center mt-2">Cart</h1>
                            <div className="w-full h-full flex px-10 mt-10">
                                {
                                    subTotal > 0 && <div className="flex flex-col space-y-3 h-[170px] w-[250px] p-4 bg-orange-100 rounded-xl shadow-xl font-Baby_Urbanist group hover:bg-indigo-100  fixed top-52 z-50">
                                    <span className="text-2xl">Subtotal ({cartLst.length} Items)</span>
                                    <span className="text-4xl font-bold ">₹{subTotal}</span>
                                    <button className="bg-baby_orange2 text-white px-2 py-1 shadow-xl rounded-sm group-hover:bg-indigo-600 duration-300 cursor-pointer" onClick={()=>navigate("/Address" , {state : {
                                        Cart : cartLst , TotalPrice : subTotal
                                    }})}>Proceed To Buy</button>
                                </div>
                                }
                                <div className="ml-auto w-[90%] h-full flex flex-wrap gap-x-10 gap-y-10 pb-20 justify-center group duration-300">
                                    {
                                        cartLst.length > 0 ? cartLst.map((ele) => (
                                            <div key={ele.Name} className="shadow-2xl w-1/4 p-6  flex flex-col h-4/5 rounded-2xl cursor-pointer relative" >
                                                <img src={`http://localhost:5000${ele.Image}`} alt="" className="rounded-lg h-[60%]" />
                                                <span className="text-xl font-semibold mt-3">{ele.Name}</span>
                                                <span className="flex space-x-2 items-center font-Baby_Urbanist mt-3">
                                                    <span className="text-2xl text-gray-800 font-bold">₹{Math.ceil(ele.Price - ele.Price * ele.Discount / 100)}</span>
                                                    <span className="text-green-500 font-bold text-sm">( {ele.Discount}% ) Off</span>
                                                </span>
                                                <span className="flex space-x-7 items-center font-Baby_Urbanist mt-2">
                                                    <span className="">Save ₹ {Math.ceil(ele.Price * ele.Discount / 100)}</span>
                                                    <span className="line-through text-gray-800">MRP ₹{ele.Price}</span>
                                                </span>
                                                <div className="flex w-full justify-center mt-2 space-x-2">
                                                    <button onClick={() => navigate(`/${ele.Name.split(" ").join("-")}/detail`, { state: { Items_datail: ele } })} className="   bg-teal-400 text-teal-100 rounded-full p-2 hover:scale-110 duration-300"><UilShare /></button>

                                                    <button onClick={() => HANDLE_REMOVE_FUNC(ele)} className="   bg-baby_orange2 text-orange-100 rounded-full p-2 hover:scale-110 duration-300">
                                                        <DeleteOutlinedIcon />
                                                    </button>
                                                </div>
                                            </div>
                                        )) : <div className="w-full h-full flex items-center justify-center">
                                            <lottie-player src="https://assets1.lottiefiles.com/private_files/lf30_e3pteeho.json" background="transparent" speed="1" style={{ width: "500px", height: "500px" }} loop autoplay></lottie-player>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}
export default Cart