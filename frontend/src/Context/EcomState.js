import EcomContext from "./EcomContext";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const EcomState = (props) => {
  const HANDLE_ADD_TO_CART = (prod) => {
    let local_data = localStorage.getItem("Cart") ? JSON.parse( localStorage.getItem("Cart")) : [] 
    if (local_data.length === 0) {
      local_data.push(prod);
      toast.success("Added to Cart!");
    } else {
      let x = local_data.find((x) => x._id === prod._id);
      if (x === undefined) {
        local_data.push(prod);
        toast.success("Added to Cart!");
      } else {
        local_data.splice(
          local_data.findIndex((el) => el._id === prod._id),
          1
        );
        toast.warn("Removed From Cart!");
      }
    }
    console.log(local_data);
    localStorage.setItem("Cart", JSON.stringify(local_data));
  };

  const CHECK_PROD_IN_LOCAL_STORAGE = (ele) => {
    const Product_Dictionary = localStorage.getItem("Wishlist") ? JSON.parse( localStorage.getItem("Wishlist")) : []  
    const Wish_Len = Object.entries(Product_Dictionary).length;
    if (Wish_Len === 0) {
      return 0;
    } else {
      if (Product_Dictionary[String(ele._id)]) {
        return ele._id;
      } else {
        return 0;
      }
    }
  };


  const HANDLE_ADD_TO_WISHLIST = async (prod) => {
    let Product_Dictionary = localStorage.getItem("Wishlist")  ? JSON.parse( localStorage.getItem("Wishlist")) : {}
    const Wish_Len = Object.entries(Product_Dictionary).length;
    if (Wish_Len === 0) {
      Product_Dictionary[String(prod._id)] = prod
      toast.success("Added to Wishlist!");
    } else {
      let x = Product_Dictionary[prod._id];
      if (x === undefined) {
        Product_Dictionary[String(prod._id)] = prod;
        toast.success("Added to Wishlist!");
      } else {
        delete Product_Dictionary[String(prod._id)];
        toast.warn("Removed From Wishlist!");
      }
    }
    console.log(Product_Dictionary)
    await localStorage.setItem("Wishlist", JSON.stringify(Product_Dictionary));
  };

  const [LoggedIn  , setLoggedIn ] = useState(false)
  const CHECK_IS_LOGGED_IN = async () =>{
    const cond = false;
    await axios.get("http://localhost:5000/api/loginCustomer" , {withCredentials : true}).then((res) =>{
      console.log(res.data)
      setLoggedIn(true)
    }).catch((err)=>{
      console.log(err)
      setLoggedIn(false)
    })
    return LoggedIn
  }

  

  return (
    <EcomContext.Provider value={{ HANDLE_ADD_TO_CART , HANDLE_ADD_TO_WISHLIST , CHECK_PROD_IN_LOCAL_STORAGE  , CHECK_IS_LOGGED_IN}}>
      {props.children}
    </EcomContext.Provider>
  );
};
export default EcomState;
