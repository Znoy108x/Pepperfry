/*
This Page is for creating a new product under which categories will be created and new items will be added to those categories !
*/

// Import Statements Start
import React, { useState, useEffect, useContext, useRef } from "react";
import Sidebar from "../components/Sidebar";
import product from "../assets/product.png";
import PanelContext from "../context/PanelContext";
import axios from "axios";
import { toast } from "react-toastify";
// Import Statements End

const AddProduct = () => {
  // AddProduct States Start
  const imageRef = useRef();
  const { ADD_PRODUCT } = useContext(PanelContext);
  const [prodName, setprodName] = useState("");
  // AddProduct States End

  // Function for making an axios call for adding a new product !
  const HANDLE_ADD_PRODUCT = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:5000/api/add-product",
        { Name: prodName },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data.Product);
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  return (
    <div className="w-screen h-screen  flex font-Baby_Urbanist relative ">
      <Sidebar />
      <div className="h-full w-[85%] flex flex-col">
        <div className="w-full h-full flex items-center justify-center shadow-2xl ">
          <form
            onSubmit={HANDLE_ADD_PRODUCT}
            className="px-10 h-[60%] w-[42%] flex space-x-3 items-center bg-white shadow-2xl rounded-xl z-50"
          >
            <img src={product} alt="" className="w-48" />
            <div className="h-full flex flex-col space-y-3 justify-center">
              <span className="text-xl font-semibold">
                Create a <span className="text-baby_purple">product</span> ...
              </span>
              <input
                type="text"
                placeholder="Product Name"
                className="outline-none bg-slate-200 border-gray-100 px-10 py-2 rounded-lg text-gray-800 tracking-wide"
                name="Name"
                value={prodName}
                onChange={(e) => setprodName(e.target.value)}
              />

              <button
                className="w-full bg-baby_purple hover:bg-baby_sky text-white duration-300 rounded-3xl py-2 ripple-bg-baby_sky"
                type="submit"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AddProduct;
