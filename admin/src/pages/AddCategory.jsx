/*
This Page is for adding a new category of product to the data base !
*/

// Import Statements Start
import React, { useState, useEffect, useContext } from "react";
import Sidebar from "../components/Sidebar";
import category_img from "../assets/category_img.jpg";
import PanelContext from "../context/PanelContext";
import DropDownAddCategory from "../components/DropDownAddCategory";
import category from "../assets/category.png";
// Import Statements End

const AddCategory = () => {
  // AddCategory States Start
  const { ADD_PRODUCT, ALL_PRODUCTS, allProducts, ADD_CATEGORY } =
    useContext(PanelContext);
  const [catData, setCatData] = useState({
    Name: "",
    Product: {
      Name: "Select a product!",
    },
  });
  // AddCategory States End
  useEffect(() => {
    ALL_PRODUCTS();
  }, []);
  // Function for calling a ADD_CATEGORY function from context that will make an axios request to add a new category
  const HANDLE_ADD_CATEGORY = (e) => {
    e.preventDefault();
    ADD_CATEGORY(catData);
    setCatData({
      Name: "",
      Product: {
        Name: "Select a product!",
      },
    });
  };

  return (
    <div className="w-screen h-screen  flex font-Baby_Urbanist relative ">
      <Sidebar />
      <div className="h-full w-[85%] flex flex-col ">
        <div className="w-full h-full flex items-center justify-center ">
          <form
            onSubmit={HANDLE_ADD_CATEGORY}
            className="px-10 h-[50%] w-[43%] flex space-x-3 items-center bg-white shadow-2xl rounded-xl z-50"
          >
            <img src={category} alt="" className="w-48" />
            <div className="h-full flex flex-col space-y-3 justify-center">
              <span className="text-xl font-semibold">
                Create a <span className="text-baby_purple">category</span> ...
              </span>
              <input
                type="text"
                placeholder="Category Name"
                className="outline-none bg-slate-200 border-gray-100 px-10 py-2 rounded-lg text-gray-800 tracking-wide"
                name="Name"
                value={catData.Name}
                onChange={(e) =>
                  setCatData({ ...catData, [e.target.name]: e.target.value })
                }
              />
              <DropDownAddCategory
                data={allProducts}
                catData={catData}
                setCatData={setCatData}
              />
              <button
                className="w-full bg-baby_purple hover:bg-baby_sky text-white duration-300 rounded-3xl py-2 ripple-bg-baby_sky"
                type="submit"
              >
                Add Category
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AddCategory;
