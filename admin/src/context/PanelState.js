import {useState , useEffect} from "react"
import PanelContext from "./PanelContext"
import axios from "axios"
import {toast} from "react-toastify"
const PanelState = (props) => {
    const BASE_URL = "http://localhost:5000/api/"
    const [active , setActive] = useState("all_product")
    const [user , setUser] = useState(false)
    const [allProducts , setAllProducts] = useState([])
    const [allCategory , setAllCategory] = useState([])
    const [admin , setAdmin] = useState({})

    const ADD_PRODUCT = async (productData) =>{
        axios.post("http://localhost:5000/api/add-product" ,productData ,  {withCredentials : true}).then((res)=>{
            console.log(res)
            toast.success(res.data.message)
        }).catch((err)=>{
            toast.error(err.response.data.message)
        })
    }
    const ALL_PRODUCTS = async () => {
        axios.get(`${BASE_URL + "get-products"}`).then((res)=>{
            setAllProducts(res.data.Products);
        }).catch((err)=>{
            toast.error(err.response.data.message)
        })
    }
    const ADD_CATEGORY = async (categoryData) =>{
        const Category_Data = {Name:categoryData.Name , Product :categoryData.Product._id}
        axios.post(`${BASE_URL}add-Category` , Category_Data ,  {withCredentials : true}).then((res)=>{
            console.log(res)
            toast.success(res.data.message)
        }).catch((err)=>{
            toast.error(err.response.data.message)
        })
    }

    const ALL_CATEGORIES = async (id) =>{
        if(id ){
            axios.get(`${BASE_URL + "category-prod"}/${id}`).then((res)=>{
                console.log(res.data.Categorys)
                setAllCategory(res.data.Categorys);
            }).catch((err)=>{
                toast.error(err.response.data.message)
            })
        }
    }
    
    const UPDATE_PRODUCT_DETAILS = (data , id) =>{
        axios.put(`http://localhost:5000/api/update-product/${id}` , data ,  {withCredentials : true}).then((res)=>{
            toast.success(res.data.message)
        }).catch((err)=>{
            toast.error(err.response.data.message)
        })
    }

    const UPDATE_CATEGORY_DETAILS = (data , id) =>{
        const cat_data = {
            Name : data.Name,
            Product : data.Product._id
        }
        axios.put(`http://localhost:5000/api/update-Category/${id}` , cat_data ,  {withCredentials : true}).then((res)=>{
            toast.success(res.data.message)
        }).catch((err)=>{
            toast.error(err.response.data.message)
        })
    }

    const CHECK_IS_LOGGED_IN = () =>{
        const res = JSON.parse(localStorage.getItem("UserData"))
        if(res !== null){
            return true
        }
        return false
    }

    
    return (
        <PanelContext.Provider value={{active , setActive , ADD_PRODUCT , user , setUser , ALL_PRODUCTS , allProducts , setAllProducts , ADD_CATEGORY , ALL_CATEGORIES , allCategory , setAllCategory , admin , setAdmin , UPDATE_PRODUCT_DETAILS , UPDATE_CATEGORY_DETAILS  , CHECK_IS_LOGGED_IN}}>
            {props.children}
        </PanelContext.Provider>
    )
}
export default PanelState