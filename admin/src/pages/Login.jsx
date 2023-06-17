/*
This is the login page for the admin dashboard !
*/
import React , {useState , useContext} from 'react'
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { toast , ToastContainer} from 'react-toastify';
import PanelContext from '../context/PanelContext';
const Login = () => {
  const {user , setUser , admin , setAdmin}  = useContext(PanelContext)
  const [show , setshow] = useState(false)
  const navigate = useNavigate()
  const [userLoginData , setuserLoginData] = useState({
    Email : "",
    Password : ""
  })
  const checker = () =>{
    let errors = 0;
    const  isValidEmail = (email) =>  {
      return /\S+@\S+\.\S+/.test(email);
    }
    if(!isValidEmail(userLoginData.Email)){
      toast.error("Write a valid Email!")
      errors += 1;
    }
    if(userLoginData.Password.length < 5){
      toast.error("Password should be more than 5 characters")
      errors += 1;
    }
    if(errors === 0){
      return true;
    }else{
      return false;
    }
  }
  const USER_LOGIN = (e) =>{
    e.preventDefault()
    if(checker()){
      axios.post("http://localhost:5000/api/login-user" , userLoginData , {withCredentials : true}).then((res)=>{
          setUser(true)
          console.log(res)
          localStorage.setItem("UserData" , JSON.stringify(res.data.User))
          setAdmin(res.data.Admin)
          navigate("/")
      }).catch((err)=>{
          console.log(err)
          toast.error(err.response.data.message)
      })
    }
  }
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-slate-100 relative">
      <ToastContainer/>
      <div className="flex space-x-3 text-baby_active absolute top-7  right-10 hover:text-baby_purple cursor-pointer" onClick={()=>navigate("/register")}>
            <span>Register</span>
            <ArrowForwardOutlinedIcon/>
        </div>
      <form  onSubmit={USER_LOGIN} className="w-1/4 h-3/5  flex flex-col  shadow-2xl rounded-xl px-10 bg-white justify-between py-12 border-2 border-gray-200"> 
        <div className="flex flex-col space-y-1 w-full ">
          <span className="text-4xl font-bold trackign-wide text-baby_sky">Welcome!</span>
          <span className="text-gray-700">Login to your <span className="font-bold tracking-wide">account</span> !</span>
        </div>
        <div className="flex flex-col space-y-2">
          <span className="font-light">Email</span>
          <span className="flex justify-between px-4 py-1 border-b-2 border-gray-200">
            <input type="text" className="outline-none h-full" name = "Email" value ={userLoginData.Email} onChange={(e)=>setuserLoginData({...userLoginData , [e.target.name] : e.target.value})}/>
            <PersonOutlineRoundedIcon className="text-gray-500"/>
          </span>
        </div>
        <div className="flex flex-col space-y-2">
          <span className="font-light">Password</span>
          <span className="flex justify-between px-4 py-1 border-b-2 border-gray-200">
            <input type={`${show ? "text" : "password"}`} className="outline-none h-full"  name = "Password" value ={userLoginData.Password} onChange={(e)=>setuserLoginData({...userLoginData , [e.target.name] : e.target.value})}/>
            <VisibilityOutlinedIcon className="text-gray-500 cursor-pointer" onClick={()=>setshow(!show)}/>
          </span>
        </div>
        <button type="submit" className="flex space-x-2 bg-baby_active text-white w-[130px] py-2 rounded-md justify-center hover:bg-baby_purple" >
          <span >Login</span> 
          <ArrowForwardOutlinedIcon/>
        </button>
      </form>
    </div>
  )
}

export default Login