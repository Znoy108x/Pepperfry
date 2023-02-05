import React, { useEffect, useState, useContext } from 'react'
import Navbar from "../Components/Navbar"
import FooterMain from "../Components/FooterMain"
import LoaderTwo from "../Components/LoaderTwo"
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const Profile = () => {
    const [orders, setOrder] = useState([])
    const [loading, setLoading] = useState(true)
    const [customer, setCustomer] = useState({})
    const navigate = useNavigate()
    const Customer_Data = async () => {
        const Customer = JSON.parse(localStorage.getItem("CustomerData"))
        const CustomerId = Customer._id
        setCustomer(Customer)
        await axios.get(`http://localhost:5000/api/getorders/${CustomerId}`).then((res) => {
            console.log(res.data.CustomerOrder)
            setOrder(res.data.CustomerOrder)
        }).catch((err) => {
            console.log(err.response)
        })
    }
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 500);
        Customer_Data()
    }, [])
    return (
        <>
            {
                loading ? <LoaderTwo /> : <div className="w-full flex flex-col font-Baby_Urbanist min-h-screen py-5 px-20">
                    <div className="w-[55%] flex justify-between">
                        <span className="text-gray-900 hover:text-baby_orange2 cursor-pointer" onClick={() => navigate("/")}><ArrowBackRoundedIcon /></span>
                        <span className="text-5xl font-semibold font-Baby_PlayFair">Profile</span>
                    </div>
                    <div className="flex flex-col space-y-2 mb-10">
                        <span className="text-2xl font-Baby_PlayFair">{customer.Name}</span>
                        <span className="text-md">{customer.Email}</span>
                    </div>
                    <div>
                        <span className="font-Baby_PlayFair text-4xl font-bold ">My Orders</span>
                        {
                            orders.length > 0 ? <div className="mt-8 flex flex-wrap gap-x-3">
                                {
                                    orders.map((ele) => (
                                        <div key={ele.Customer} className="flex space-x-4">
                                            {
                                                ele.Items.map((ele2) => (
                                                    <div className="relative flex flex-col space-y-1 w-72 shadow-2xl p-4 rounded-xl items-center">
                                                        <img src={`http://localhost:5000${ele2.Image}`} alt="" className="w-64 h-64 rounded-lg" />
                                                        <span className="absolute top-5 right-5 bg-blue-200 text-xs text-blue-700 rounded-3xl px-2 py-1">{ele2.tracking}</span>
                                                        <span className="font-Baby_PlayFair">{ele2.Name}</span>
                                                        <span className="text-green-400">₹ {ele2.Price}</span>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    ))
                                }
                            </div> : <div className="w-full h-full flex items-center justify-center">
                                <lottie-player src="https://assets1.lottiefiles.com/private_files/lf30_e3pteeho.json" background="transparent" speed="1" style={{ width: "500px", height: "500px" }} loop autoplay></lottie-player>
                            </div>

                        }
                    </div>
                </div>
            }
        </>

    )
}
export default Profile