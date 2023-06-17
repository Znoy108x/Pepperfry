import React , {useEffect , useState} from 'react'
import logo from "../assets/logo.jpg"
import axios from "axios"
import {useNavigate} from "react-router-dom"


import { UilShoppingCart } from '@iconscout/react-unicons'
import { UilUser } from '@iconscout/react-unicons'
import { UilHeart } from '@iconscout/react-unicons'
import { UilTimes } from '@iconscout/react-unicons'


import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import loginPage from "../assets/loginPage.jpg"
import registerImage from "../assets/registerImage.webp"
import {toast} from "react-toastify"

const Navbar = () => {
  const [loginUserData , setloginUserData] = useState({
    Email : "",
    Password : ""
  })
  const [registerUserData , setregisterUserData] = useState({
    Name : "",
    PhoneNumber : "",
    PinCode : "",
    Email:"",
    Password : ""
  })
  const [isLoggedIn , setisLoggedIn] = useState(false)
  const navigate = useNavigate()
  const [prod , setProd] = useState([])
  const FETCH_ALL_PROD = () =>{
    axios.get("http://localhost:5000/api/get-products").then((res) =>{
      setProd(res.data.Products)
    }).catch((err)=>{
      console.log(err)
    })
  }
  useEffect(() => {
    FETCH_ALL_PROD()
  }, []);
  let [isloginopen, setisloginopen] = useState(false)
  let [isregisteropen, setisregisteropen] = useState(false)

  function closeLoginModal() {
    setisloginopen(false)
  }
  function openLoginModal() {
    setisloginopen(true)
  }
  function closeRegisterModal() {
    setisregisteropen(false)
  }
  function openRegisterModal() {
    setisregisteropen(true)
    
  }
  const CHECK_IS_LOGGED_IN = () =>{
    axios.get("http://localhost:5000/api/loginCustomer" , {withCredentials : true}).then((res) =>{
      setisLoggedIn(res.data)
    }).catch((err)=>{
      console.log(err)
      setisLoggedIn(err.response.data.cookie)
    })
  }
  const HANDLE_LOGIN_CUSTOMER = () =>{
    axios.post("http://localhost:5000/api/login-customer" , loginUserData , {withCredentials : true}).then((res) =>{
      localStorage.setItem("CustomerData" , JSON.stringify(res.data.Customer))
      toast.success("Successfully Loggedin!")
      setloginUserData({
        Email:"",
        Password : ""
      })
      CHECK_IS_LOGGED_IN()
      closeLoginModal()
    }).catch((err)=>{
      console.log(err)
      toast.error(err.response.data.message)
    })
  }
  const HANDLE_REGISTER_CUSTOMER = () =>{
    axios.post("http://localhost:5000/api/create-customer" ,registerUserData ).then((res) =>{
      console.log(res)
      toast.success("Successfully Registered!")
      setregisterUserData({
        Name : "",
        PhoneNumber : "",
        PinCode : "",
        Email:"",
        Password : ""
      })
      CHECK_IS_LOGGED_IN()
      closeRegisterModal()
    }).catch((err)=>{
      console.log(err)
      toast.error(err.response.data.message)
    })
  }
  const REGISTER_TO_LOGIN = () =>{
    closeRegisterModal()
    setTimeout(()=>{
      openLoginModal()
    },600)
  }
  const LOGIN_TO_REGISTER = () =>{
    closeLoginModal()
    setTimeout(()=>{
      openRegisterModal()
    },600)
  }
  const HANDLE_LOGOUT = () =>{
    axios.get("http://localhost:5000/api/logoutCustomer" , {withCredentials : true}).then((res) =>{
      toast.success("Logged Out!")
      CHECK_IS_LOGGED_IN()
      navigate("/")
    }).catch((err)=>{
      toast.error(err.response.data.message)
    })
  }
  useEffect(()=>{
    CHECK_IS_LOGGED_IN()
  },[])
  return (
    <>
    <div className="w-full h-28 flex flex-col font-Baby_PlayFair">
        <div className="h-[60%] flex w-full items-center px-10 justify-between">
          <img src={logo} alt="" className="cursor-pointer h-10 w-[200px]" onClick={()=>navigate("/")}/>
          <div className="flex space-x-5">
            {
              !isLoggedIn ? <div className="flex space-x-4 items-center">
                  <span className="cursor-pointer hover:text-[#ec2326]" onClick={openLoginModal}>Login</span>
                  <span className="cursor-pointer hover:text-[#ec2326]" onClick={openRegisterModal}>Register</span>
              </div> : <span className="cursor-pointer hover:text-[#ec2326]" onClick={HANDLE_LOGOUT}>Log Out </span>
            }
            <UilHeart className="cursor-pointer hover:text-[#ec2326]" onClick={()=>navigate("/Wishlist")}/>
            <UilShoppingCart className="cursor-pointer hover:text-[#ec2326]" onClick={()=>navigate("/Cart")}/>
            {
              isLoggedIn &&  <UilUser className="cursor-pointer hover:text-[#ec2326]" onClick={()=>navigate("/Profile")}/>
            }
          </div>
        </div>
        <div className="w-full h-[20%] flex flex-wrap justify-center  items-center  px-32  text-sm gap-x-9 font-Baby_Urbanist tracking-wide ">
          {
            prod.map((ele)=>(
                <span key={ele._id} className="cursor-pointer hover:scale-110 duration-300 hover:text-[#ec2326] text-xl font-Baby_PlayFair font-semibold tracking-wider" onClick={()=>navigate(`/${ele.Name.replace(/\s+/g, "")}` , { state: { product : ele , products : prod} })}>
                  {ele.Name}
                </span>
            ))
          }
        </div>
        <Transition appear show={isloginopen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeLoginModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto bg-black/60">
            <div className="flex min-h-screen items-center justify-center p-4 text-center ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className=" font-Baby_PlayFair w-[50vw] h-[70vh]  transform overflow-hidden rounded-sm text-left align-middle shadow-xl transition-all">
                  <div className="w-full h-full bg-white flex">
                    <img src={loginPage} alt="" className="w-1/2 h-full"/>
                    <div className="w-1/2 h-full p-5 flex flex-col relative">
                      <span className="absolute top-3 right-3 hover:text-baby_orange2 cursor-pointer" onClick={closeLoginModal}>
                        <UilTimes/>
                      </span>
                      <div className="w-full h-20 overflow-hidden flex flex-col space-y-2">
                        <span className="font-Baby_PlayFair text-gray-900 text-3xl">Login</span>
                        <span className="font-Baby_PlayFair text-sm">Track your order, create wishlist & more</span>
                      </div>
                      <div className="w-full justify-between h-42 flex flex-col space-y-3 mt-4">
                        <input type="text" placeholder='Email ID' className="text-gray-900 outline-none tracking-wider px-4 font-Baby_Urbanist" name="Email" value={loginUserData.Email} onChange={(e)=>setloginUserData({...loginUserData , [e.target.name] : e.target.value})}/>
                        <input type="password" placeholder='Password' className="text-gray-900 outline-none tracking-wider px-4 font-Baby_Urbanist"  name="Password" value={loginUserData.Password} onChange={(e)=>setloginUserData({...loginUserData , [e.target.name] : e.target.value})}/>
                      </div>
                      <button className="w-full h-10 bg-baby_orange2 text-white font-Baby_Urbanist mt-4 hover:bg-amber-700 duration-300 " onClick={HANDLE_LOGIN_CUSTOMER}>Login In</button>
                      <h1 className="text-center mt-4 font-Baby_Urbanist">New to pepperfry ? <span className="text-baby_orange2 hover:text-amber-700 cursor-pointer text-sm" onClick={LOGIN_TO_REGISTER}>Register Here</span></h1>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Transition appear show={isregisteropen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeRegisterModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto bg-black/60">
            <div className="flex min-h-screen items-center justify-center p-4 text-center ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className=" font-Baby_PlayFair w-[50vw] h-[70vh]  transform overflow-hidden rounded-sm text-left align-middle shadow-xl transition-all">
                  <div className="w-full h-full bg-white flex">
                    <img src={loginPage} alt="" className="w-1/2 h-full"/>
                    <div className="w-1/2 h-full p-5 flex flex-col relative">
                      <span className="absolute top-3 right-3 hover:text-baby_orange2 cursor-pointer" onClick={closeRegisterModal}>
                        <UilTimes/>
                      </span>
                      <div className="w-full h-20 overflow-hidden flex flex-col space-y-2">
                        <span className="font-Baby_PlayFair text-gray-900 text-3xl">Register</span>
                        <span className="font-Baby_PlayFair text-sm">Track your order, create wishlist & more</span>
                      </div>
                      <div className="w-full justify-between h-42 flex flex-col space-y-3 mt-4 ">
                        <input type="text" placeholder='Name' className="text-gray-900 outline-none tracking-wider px-4 font-Baby_Urbanist "  name="Name" value={registerUserData.Name} onChange={(e)=>setregisterUserData({...registerUserData , [e.target.name] : e.target.value})}/>
                        <div className="w-full flex justify-between">
                          <input type="text" placeholder='Mobile Number' className="text-gray-900 outline-none tracking-wider px-4 font-Baby_Urbanist w-[55%] text-center"  name="PhoneNumber" value={registerUserData.PhoneNumber} onChange={(e)=>setregisterUserData({...registerUserData , [e.target.name] : e.target.value})}/>
                          <input type="text" placeholder='Pin Code' className="text-gray-900 outline-none tracking-wider px-4 font-Baby_Urbanist w-[35%] text-center"  name="PinCode" value={registerUserData.PinCode} onChange={(e)=>setregisterUserData({...registerUserData , [e.target.name] : e.target.value})}/>
                        </div>
                        <input type="email" placeholder='Email' className="text-gray-900 outline-none tracking-wider px-4 font-Baby_Urbanist"  name="Email" value={registerUserData.Email} onChange={(e)=>setregisterUserData({...registerUserData , [e.target.name] : e.target.value})}/>
                        <input type="password" placeholder='Password' className="text-gray-900 outline-none tracking-wider px-4 font-Baby_Urbanist"  name="Password" value={registerUserData.Password} onChange={(e)=>setregisterUserData({...registerUserData , [e.target.name] : e.target.value})}/>
                      </div>
                      <button className="w-full h-10 bg-baby_orange2 text-white font-Baby_Urbanist mt-4 hover:bg-amber-700 duration-300 " onClick={HANDLE_REGISTER_CUSTOMER}>Register</button>
                      <h1 className="text-center mt-4 font-Baby_Urbanist">Already a member ? <span className="text-baby_orange2 hover:text-amber-700 cursor-pointer text-sm" onClick={REGISTER_TO_LOGIN}>Login Here</span></h1>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      </div>
    </>
  )
}
export default Navbar