/*
This Page is for adding a new item belonging to a particular category to the data base !
*/

// Import Statements Start
import React, { useState, useEffect, useContext, useRef } from "react";
import Sidebar from "../components/Sidebar";
import PanelContext from "../context/PanelContext";
import category from "../assets/category.png";
import DropDownAddItem from "../components/DropDownAddItem";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { toast } from "react-toastify";
import axios from "axios";
// Import Statements End

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const AddItems = () => {
  // Context API
  const { ALL_PRODUCTS, allProducts, ALL_CATEGORIES, allCategory } =
    useContext(PanelContext);
  // Context API

  // AddItems States Start
  const i1 = useRef();
  const m1 = useRef();
  const m2 = useRef();
  const m3 = useRef();
  const m4 = useRef();
  const [itemData, setItemData] = useState({
    Name: "",
    Product: {
      Name: "Choose Product!",
    },
    Category: {
      Name: "Choose Category!",
    },
    Price: "",
    Discount: "",
    Image: "",
    MainImage: [],
    Description: "",
    ManufacturingId: "",
    ManufacturingDate: "",
    Colors: [],
    Size: [],
    Gender: "",
  });
  // AddItems States End

  useEffect(() => {
    ALL_PRODUCTS();
    ALL_CATEGORIES(itemData.Product._id);
  }, [itemData.Product, itemData.Name]);
  const HANDLE_ADD_ITEM = (e) => {
    e.preventDefault();
    const ITEM_FORM = new FormData();
    ITEM_FORM.append("Name", itemData.Name);
    ITEM_FORM.append("Product", itemData.Product._id);
    ITEM_FORM.append("Category", itemData.Category._id);
    ITEM_FORM.append("Price", itemData.Price);
    ITEM_FORM.append("Discount", itemData.Discount);
    ITEM_FORM.append("Image", i1.current.files[0]);
    ITEM_FORM.append("MainImage", m1.current.files[0]);
    ITEM_FORM.append("MainImage", m2.current.files[0]);
    ITEM_FORM.append("MainImage", m3.current.files[0]);
    ITEM_FORM.append("MainImage", m4.current.files[0]);
    ITEM_FORM.append("Description", itemData.Description);
    ITEM_FORM.append("ManufacturingId", itemData.ManufacturingId);
    ITEM_FORM.append("ManufacturingDate", itemData.ManufacturingDate);
    ITEM_FORM.append("Colors", []);
    ITEM_FORM.append("Size", []);
    ITEM_FORM.append("Gender", itemData.Gender);
    axios
      .post("http://localhost:5000/api/create-items", ITEM_FORM, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success("Item Created !");
      })
      .catch((err) => {
        toast.error(err.message);
      });
    setItemData({
      Name: "",
      Product: {
        Name: "Choose Product!",
      },
      Category: {
        Name: "Choose Category!",
      },
      Price: "",
      Discount: "",
      Image: "",
      MainImage: [],
      Description: "",
      ManufacturingId: "",
      ManufacturingDate: "",
      Colors: [],
      Size: [],
      Gender: "",
    });
  };
  return (
    <div className="w-screen h-screen flex font-Baby_Urbanist relative ">
      <Sidebar />
      <div className="h-full w-[85%] flex flex-col ">
        <div className="w-full h-full flex items-center justify-center ">
          <form
            onSubmit={HANDLE_ADD_ITEM}
            className="px-10 h-[96%] w-[80%]  bg-white shadow-2xl rounded-xl flex flex-col p-4 space-y-3 "
          >
            <span className=" font-semibold text-center text-3xl">
              Create a <span className="text-baby_purple">Item</span> ...
            </span>
            <div className="flex justify-between w-full h-full px-10 pt-10 ">
              <div className="w-1/3 h-full flex  flex-col space-y-3">
                <div className="flex flex-col space-y-2 ">
                  <span>Name</span>
                  <input
                    type="text"
                    placeholder="Category Name"
                    className="outline-none bg-slate-200 border-gray-100 px-10 py-2 rounded-lg text-gray-800 tracking-wide"
                    name="Name"
                    value={itemData.Name}
                    onChange={(e) =>
                      setItemData({
                        ...itemData,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex space-x-5">
                  <DropDownAddItem
                    data={allProducts}
                    itemData={itemData}
                    setItemData={setItemData}
                    Cond="Product"
                  />
                  <DropDownAddItem
                    data={allCategory}
                    itemData={itemData}
                    setItemData={setItemData}
                    Cond="Category"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <span>Price</span>
                  <input
                    type="text"
                    placeholder="Price"
                    className="outline-none bg-slate-200 border-gray-100 px-10 py-2 rounded-lg text-gray-800 tracking-wide"
                    name="Price"
                    value={itemData.Price}
                    onChange={(e) =>
                      setItemData({
                        ...itemData,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <span>Discount</span>
                  <input
                    type="text"
                    placeholder="Discount"
                    className="outline-none bg-slate-200 border-gray-100 px-10 py-2 rounded-lg text-gray-800 tracking-wide"
                    name="Discount"
                    value={itemData.Discount}
                    onChange={(e) =>
                      setItemData({
                        ...itemData,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col space-y-2 h-[30%]">
                  <span>Description</span>
                  <textarea
                    type="text"
                    placeholder="Description"
                    className="h-full outline-none bg-slate-200 border-gray-100 px-10 py-2 rounded-lg text-gray-800 tracking-wide"
                    name="Description"
                    value={itemData.Description}
                    onChange={(e) =>
                      setItemData({
                        ...itemData,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="w-1/3 h-full flex flex-col space-y-5 ">
                <span className="text-center text-xl font-semibold">
                  Manufacturing Details
                </span>
                <div className="flex space-x-5 w-full">
                  <input
                    type="text"
                    placeholder="Manu. Id"
                    className="w-1/2 outline-none bg-slate-200 border-gray-100 px-10 py-2 rounded-lg text-gray-800 tracking-wide"
                    name="ManufacturingId"
                    value={itemData.ManufacturingId}
                    onChange={(e) =>
                      setItemData({
                        ...itemData,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />

                  <input
                    type="text"
                    placeholder="Manu. Date"
                    className="w-1/2 outline-none bg-slate-200 border-gray-100 px-10 py-2 rounded-lg text-gray-800 tracking-wide"
                    name="ManufacturingDate"
                    value={itemData.ManufacturingDate}
                    onChange={(e) =>
                      setItemData({
                        ...itemData,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                      Gender
                      <ChevronDownIcon
                        className="-mr-1 ml-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {[
                          {
                            Name: "Male",
                          },
                          {
                            Name: "Female",
                          },
                        ].map((ele) => (
                          <Menu.Item key={ele.Name}>
                            {({ active }) => (
                              <span
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900 cursor-pointer"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm cursor-pointer"
                                )}
                                onClick={() =>
                                  setItemData({ ...itemData, Gender: ele.Name })
                                }
                              >
                                {ele.Name}
                              </span>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
                <span className="text-center text-xl font-semibold">
                  Upload Image
                </span>
                <div className="flex flex-col space-y-2">
                  <span className="text-lg font-semibold">Show Case Image</span>

                  <input
                    type="file"
                    id="file-id"
                    className="text-sm text-grey-500 file:mr-5 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:cursor-pointer hover:file:bg-amber-50 hover:file:text-amber-700"
                    name="Image"
                    ref={i1}
                  />

                  <span className="text-lg font-semibold">Main Image</span>

                  <input
                    type="file"
                    id="file-id"
                    className="text-sm text-grey-500 file:mr-5 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:cursor-pointer hover:file:bg-amber-50 hover:file:text-amber-700"
                    name="MainImage1"
                    ref={m1}
                  />

                  <input
                    type="file"
                    id="file-id"
                    className="text-sm text-grey-500 file:mr-5 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:cursor-pointer hover:file:bg-amber-50 hover:file:text-amber-700"
                    name="MainImage2"
                    ref={m2}
                  />

                  <input
                    type="file"
                    id="file-id"
                    className="text-sm text-grey-500 file:mr-5 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:cursor-pointer hover:file:bg-amber-50 hover:file:text-amber-700"
                    name="MainImage3"
                    ref={m3}
                  />

                  <input
                    type="file"
                    id="file-id"
                    className="text-sm text-grey-500 file:mr-5 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:cursor-pointer hover:file:bg-amber-50 hover:file:text-amber-700"
                    name="MainImage4"
                    ref={m4}
                  />
                </div>
              </div>
            </div>
            <button
              className="w-1/3 mx-auto bg-baby_purple hover:bg-baby_sky text-white duration-300 rounded-3xl py-2 ripple-bg-baby_sky"
              type="submit"
            >
              Add Item
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AddItems;
