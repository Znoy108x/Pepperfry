/*
This page is used to fetch all the categories from the data base and display them on the table and adding  edit , delete operations on them!
*/

// Import Statements Start
import React, { Fragment, useState, useEffect, useContext } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";
import { Transition, Dialog } from "@headlessui/react";
import PanelContext from "../context/PanelContext";
import categoryImage from "../assets/category.png";
import DropDownAddCategory from "../components/DropDownAddCategory";
// Import Statements End

const AllCategories = () => {
  // States Start
  const [category, setCategory] = useState([]);
  let [isOpen, setIsOpen] = useState(false);
  const { UPDATE_CATEGORY_DETAILS } = useContext(PanelContext);
  const [catId, setcatId] = useState("");
  const [catData, setCategoryData] = useState({
    Name: "",
    Admin: "",
    Product: {
      Name: "Select a product!",
    },
  });
  // States End

  const SET_ROW = () => {
    let rows = [];
    axios
      .get("http://localhost:5000/api/get-Categorys", { withCredentials: true })
      .then((res) => {
        res.data.Categorys.map((ele) => {
          let cat_ele = {
            id: 0,
            category: "",
            admin_id: "",
            created_date: "",
            updated_date: "",
          };
          cat_ele.admin_id = ele.Admin;
          cat_ele.id = ele._id;
          cat_ele.category = ele.Name;
          cat_ele.created_date = ele.createdAt.split("T")[0];
          cat_ele.updated_date = ele.updatedAt.split("T")[0];
          rows.push(cat_ele);
        });
        setCategory(rows);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  useEffect(() => {
    SET_ROW();
  }, [catData]);
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="flex  w-full justify-center space-x-4">
            <div
              className="px-2 py-1 rounded-full text-xs cursor-pointer bg-green-500 text-white hover:scale-105 duration-200 hover:bg-green-400"
              onClick={() => UPDATE_CATEGORY(params)}
            >
              Edit
            </div>
            <div
              className="px-2 py-1 rounded-full text-xs cursor-pointer bg-red-500 text-white hover:scale-105 duration-200 hover:bg-red-400"
              onClick={() => DELETE_CATEGORY(params)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  const columns = [
    { field: "category", headerName: "Category Name", width: 120 },
    { field: "admin_id", headerName: "Creator Id", width: 210 },
    { field: "created_date", headerName: "Created At", width: 170 },
    { field: "updated_date", headerName: "Updated At", width: 170 },
  ];
  const DELETE_CATEGORY = (params) => {
    axios
      .delete(`http://localhost:5000/api/delete-Category/${params.id}`, {
        withCredentials: true,
      })
      .then((res) => {
        SET_ROW();
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  const UPDATE_CATEGORY = (params) => {
    setcatId(params.id);
    axios
      .get(`http://localhost:5000/api/get-Category/${params.id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setCategoryData({
          ...catData,
          Name: res.data.Category[0].Name,
          Admin: res.data.Category[0].Admin,
        });
      })
      .catch((err) => {
        toast.error(err.message);
      });
    openModal();
  };
  const HANDLE_EDIT_CATEGORY = (e) => {
    e.preventDefault();
    UPDATE_CATEGORY_DETAILS(catData, catId);
    setCategoryData({
      Name: "",
      Admin: "",
      Product: {
        Name: "Select a product!",
      },
    });
    SET_ROW();
  };

  const { ALL_PRODUCTS, allProducts } = useContext(PanelContext);

  useEffect(() => {
    ALL_PRODUCTS();
  }, [, catData]);

  return (
    <div className="w-screen h-screen bg-slate-50 flex font-Baby_Urbanist relative overflow-hidden">
      <Sidebar />
      <div className="h-full w-[85%] flex flex-col ">
        <div className="w-full h-full flex flex-col bg-slate-50">
          <div className="w-full h-[10%]">
            <span className="font-dancing text-6xl font-semibold ml-16">
              All Categories..
            </span>
          </div>
          <div className="w-full h-[90%] flex ">
            <div className="w-[65%] h-[99%]  rounded-lg bg-white pl-2 py-1">
              <DataGrid
                rows={category}
                columns={columns.concat(actionColumn)}
                pageSize={10}
                rowsPerPageOptions={[12]}
                checkboxSelection={false}
                sx={{
                  "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                    outline: "none !important",
                  },
                }}
              />
            </div>
            <div className="h-full w-[35%]">
              <lottie-player
                src="https://assets1.lottiefiles.com/packages/lf20_awucen2m.json"
                background="transparent"
                speed="1"
                style={{ width: "500px", height: "500px" }}
                loop
                autoplay
              ></lottie-player>
            </div>
          </div>
        </div>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
            <div className="w-screen h-screen fixed inset-0 overflow-y-auto">
              <div className=" flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-[700px] h-[500px]  transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all flex items-center justify-center bg-baby_green">
                    <form
                      onSubmit={HANDLE_EDIT_CATEGORY}
                      className="h-[460px] w-[800px] px-10 flex space-x-3 items-center bg-white shadow-2xl rounded-xl"
                    >
                      <img src={categoryImage} alt="" className="w-[300px]" />
                      <div className="h-full flex flex-col space-y-3 justify-center">
                        <span className="text-xl font-semibold">
                          Edit{" "}
                          <span className="text-baby_purple">category</span> ...
                        </span>
                        <input
                          type="text"
                          placeholder="Category Name"
                          className="outline-none bg-slate-200 border-gray-100 px-10 py-2 rounded-lg text-gray-800 tracking-wide"
                          name="Name"
                          value={`Cat Id : ${catId}`}
                          disabled
                        />
                        <input
                          type="text"
                          placeholder="Category Name"
                          className="outline-none bg-slate-200 border-gray-100 px-10 py-2 rounded-lg text-gray-800 tracking-wide"
                          name="Name"
                          value={catData.Name}
                          onChange={(e) =>
                            setCategoryData({
                              ...catData,
                              [e.target.name]: e.target.value,
                            })
                          }
                        />
                        <input
                          type="text"
                          placeholder="Category Name"
                          className="outline-none bg-slate-200 border-gray-100 px-10 py-2 rounded-lg text-gray-800 tracking-wide"
                          name="Admin"
                          value={`Admin Id : ${catData.Admin}`}
                          disabled
                        />
                        <DropDownAddCategory
                          data={allProducts}
                          catData={catData}
                          setCatData={setCategoryData}
                        />
                        <button
                          className="w-full bg-baby_purple hover:bg-baby_sky text-white duration-300 rounded-3xl py-2 ripple-bg-baby_sky"
                          type="submit"
                          onClick={closeModal}
                        >
                          Update Category
                        </button>
                      </div>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </div>
  );
};
export default AllCategories;
