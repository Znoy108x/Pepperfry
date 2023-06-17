/*
This is the registeration page and it's used for creating a new admin !
*/
import React , {useState , useEffect , useRef} from 'react'
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import LoadingBar from 'react-top-loading-bar'
import { ToastContainer, toast } from 'react-toastify';
const Register = () => {
    const [show , setshow] = useState(false)
    const  isValidEmail = (email) =>  {
      return /\S+@\S+\.\S+/.test(email);
    }
    const [progress, setProgress] = useState(0)
    const imageRef = useRef()
    const [adminData , setAdminData]  = useState({
      Name : "" ,
      Email : "",
      Password : "",
      Role : "admin",
      file : ""
    })
    const checker = () =>{
      let errors = 0;
      if(adminData.Name.length <5){
        toast.error("Name should have length greater than 5")
        errors += 1;
      }
      if(!isValidEmail(adminData.Email)){
        toast.error("Write a valid Email!")
        errors += 1;
      }
      if(adminData.Password.length < 5){
        toast.error("Password should be more than 5 characters")
        errors += 1;
      }
      if(adminData.file === ""){
        toast.error("Please select a image!")
        errors += 1;
      }
      if(errors === 0){
        return true;
      }else{
        return false;
      }
    }
    const navigate = useNavigate()
    const REGISTER_USER = async (e) =>{
      e.preventDefault()
      setProgress(progress +  20)
      const formData = new FormData()
      formData.append("Name" , adminData.Name)
      formData.append("Email" , adminData.Email)
      formData.append("Role" , adminData.Role)
      formData.append("Password" , adminData.Password)
      formData.append("image" , imageRef.current.files[0])
      if(checker() === true){
        setProgress(progress +  20)
        axios.post("http://localhost:5000/api/create-user" , formData).then((res)=>{
          setProgress(progress +  20)
          const message = res.data.message;
            toast.success("Admin Created !")
            setProgress(100)
            navigate("/login")
        }).catch((err)=>{
          setProgress(progress + 30)
          toast.error(err.message)
          setProgress(100)
        })
      }
    }
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-slate-100 relative">
        <LoadingBar color='#306cdd' progress={progress} onLoaderFinished={() => setProgress(0)} />
        <ToastContainer/>
        <div className="flex space-x-3 text-baby_active absolute top-7  right-10 hover:text-baby_purple cursor-pointer" onClick={(e)=>navigate("/login")}>
            <span>Login</span>
            <ArrowForwardOutlinedIcon/>
        </div>
      <form onSubmit={REGISTER_USER} className="w-1/4 h-4/5  flex flex-col  shadow-2xl rounded-xl px-10 bg-white justify-between py-12 border-2 border-gray-200"> 
        <div className="flex flex-col space-y-1 w-full ">
          <span className="text-4xl font-bold trackign-wide text-baby_sky">Welcome!</span>
          <span className="text-gray-700">Join us !</span>
        </div>
        <div className="flex flex-col space-y-2">
          <span className="font-light">Name</span>
          <span className="flex justify-between px-4 py-1 border-b-2 border-gray-200">
            <input type="text" className="outline-none h-full" name ="Name" value ={adminData.Name} onChange={(e) => setAdminData({...adminData , [e.target.name] : e.target.value})}/>
            <PersonOutlineRoundedIcon className="text-gray-500"/>
          </span>
        </div>
        <div className="flex flex-col space-y-2">
          <span className="font-light">Email</span>
          <span className="flex justify-between px-4 py-1 border-b-2 border-gray-200">
            <input type="text" className="outline-none h-full"  name ="Email" value ={adminData.Email} onChange={(e) => setAdminData({...adminData , [e.target.name] : e.target.value})}/>
            <PersonOutlineRoundedIcon className="text-gray-500"/>
          </span>
        </div>
        <div className="flex flex-col space-y-2">
          <span className="font-light">Password</span>
          <span className="flex justify-between px-4 py-1 border-b-2 border-gray-200">
            <input type={`${show ? "text" : "password"}`}  className="outline-none h-full"  name ="Password" value ={adminData.Password} onChange={(e) => setAdminData({...adminData , [e.target.name] : e.target.value})}/>
            <VisibilityOutlinedIcon className="text-gray-500 cursor-pointer" onClick={()=>setshow(!show)}/>
          </span>
        </div>
        <span>
            <input type="file" id="file-id" className="text-sm text-grey-500
            file:mr-5 file:py-2 file:px-6
            file:rounded-full file:border-0
            file:text-sm file:font-medium
            file:bg-blue-50 file:text-blue-700
            hover:file:cursor-pointer hover:file:bg-amber-50
            hover:file:text-amber-700"  name ="file"  ref={imageRef} onChange={(e)=>setAdminData({...adminData , [e.target.name] : imageRef.current.files[0]})}/>
        </span>
        <button className="flex space-x-2 bg-baby_active text-white w-[130px] py-2 rounded-md justify-center hover:bg-baby_purple" type="submit">
          <span>Register</span> 
          <ArrowForwardOutlinedIcon/>
        </button>
      </form>
    </div>
  )
}
export default Register