/*
This page is used to fetch all the products from the data base and display them on the table and adding  edit , delete operations on them!
*/
import React, { Fragment, useState, useEffect, useContext } from 'react'
import Sidebar from "../components/Sidebar"
import axios from "axios"
import { toast } from "react-toastify"
import { DataGrid } from '@mui/x-data-grid'
import { Transition, Dialog } from '@headlessui/react'
import PanelContext from '../context/PanelContext'
import productImage from "../assets/product.png"
const AllProduct = () => {
  const [product, setProduct] = useState([])
  let [isOpen, setIsOpen] = useState(false)
  const { UPDATE_PRODUCT_DETAILS } = useContext(PanelContext)
  const [prodId, setprodId] = useState("")
  const [productData, setproductData] = useState({
    Name: "",
    Description: ""
  })
  const SET_ROW = () => {
    let rows = []
    axios.get("http://localhost:5000/api/get-products", { withCredentials: true }).then((res) => {
      res.data.Products.map((ele) => {
        let prod_ele = {
          id: 0,
          product: "",
          admin_id: "",
          created_date: "",
          updated_date: ""
        }
        prod_ele.admin_id = ele.Admin
        prod_ele.id = ele._id;
        prod_ele.product = ele.Name;
        prod_ele.created_date = ele.createdAt.split("T")[0];
        prod_ele.updated_date = ele.updatedAt.split("T")[0];
        rows.push(prod_ele);
      })
      setProduct(rows)
    }).catch((err) => {
      toast.error(err.message)
    })
  }
  useEffect(() => {
    SET_ROW()
  }, [productData,]);
  function closeModal() {
    setIsOpen(false)
  }
  function openModal() {
    setIsOpen(true)
  }
  const actionColumn = [
    {
      field: "action", headerName: "Action", width: 200, renderCell: (params) => {
        return <div className="flex  w-full justify-center space-x-4">
          <div className="px-2 py-1 rounded-full text-xs cursor-pointer bg-green-500 text-white hover:scale-105 duration-200 hover:bg-green-400" onClick={() => UPDATE_PRODUCT(params)}>Edit</div>
          <div className="px-2 py-1 rounded-full text-xs cursor-pointer bg-red-500 text-white hover:scale-105 duration-200 hover:bg-red-400" onClick={() => DELETE_PRODUCT(params)}>Delete</div>
        </div>
      }
    }
  ]
  const columns = [
    { field: 'product', headerName: 'Product Name', width: 120 },
    { field: 'admin_id', headerName: 'Creater Id', width: 210 },
    { field: 'created_date', headerName: 'Created At', width: 170 },
    { field: 'updated_date', headerName: 'Updated At', width: 170 }
  ];
  const DELETE_PRODUCT = (params) => {
    axios.delete(`http://localhost:5000/api/delete-product/${params.id}`, { withCredentials: true }).then((res) => {
      SET_ROW()
      toast.success(res.data.message)
    }).catch((err) => {
      toast.error(err.message)
    })
  }
  const UPDATE_PRODUCT = (params) => {
    setprodId(params.id)
    axios.get(`http://localhost:5000/api/get-product/${params.id}`, { withCredentials: true }).then((res) => {
      setproductData({ Name: res.data.Products[0].Name, Description: res.data.Products[0].Description })
    }).catch((err) => {
      toast.error(err.message)
    })
    openModal()
  }
  const HANDLE_EDIT_PRODUCT = (e) => {
    e.preventDefault()
    UPDATE_PRODUCT_DETAILS(productData, prodId)
    setproductData({
      Name: "",
      Description: ""
    })
    SET_ROW()
  }

  return (
    <div className="w-screen h-screen bg-slate-50 flex font-Baby_Urbanist relative ">
      <Sidebar />
      <div className="h-full w-[85%] flex flex-col overflow-hidden">
        <div className="w-full h-full flex flex-col bg-slate-50">
          <div className="w-full h-[10%]">
            <span className="font-dancing text-6xl font-semibold ml-16">All Products</span>
          </div>
          <div className="w-full h-[90%] flex ">
            <div className="w-[65%] h-[99%]  rounded-lg bg-white pl-2 py-1">
              <DataGrid rows={product} columns={columns.concat(actionColumn)} pageSize={10} rowsPerPageOptions={[12]} checkboxSelection={false} sx={{
                "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                  outline: "none !important",
                },
              }} />
            </div>
            <div className="h-full w-[30%]">
              <lottie-player src="https://assets1.lottiefiles.com/packages/lf20_awucen2m.json" background="transparent" speed="1" style={{ width: "500px", height: "500px" }} loop autoplay></lottie-player>
            </div>
          </div>
        </div>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>
            <div className="w-screen h-screen fixed inset-0 overflow-y-auto">
              <div className=" flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                  <Dialog.Panel className="w-[700px] h-[500px]  transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all flex items-center justify-center bg-baby_green">
                    <form onSubmit={HANDLE_EDIT_PRODUCT} className="px-10 h-full w-full flex space-x-3 items-center  rounded-xl bg-baby_light_green">
                      <img src={productImage} className="w-[300px]" alt="image" />
                      <div className="h-full flex flex-col space-y-3 justify-center py-2">
                        <span className="text-xl font-semibold ml-3">Edit <span className='text-baby_purple'>product</span> ...</span>
                        <input type="text" placeholder='Product Name' className="outline-none bg-slate-200 border-gray-100 px-10 py-2 rounded-lg text-gray-800 tracking-wide" name="Product_Id" value={prodId} disabled />
                        <input type="text" placeholder='Product Name' className="outline-none bg-slate-200 border-gray-100 px-10 py-2 rounded-lg text-gray-800 tracking-wide" name="Name" value={productData.Name} onChange={(e) => setproductData({ ...productData, [e.target.name]: e.target.value })} />
                        <textarea type="text" className="text-gray-800 tracking-wide h-1/3 w-full outline-none bg-slate-200 border-gray-100 px-10 py-2 rounded-lg" placeholder='Description' style={{ resize: "none" }} name="Description" value={productData.Description} onChange={(e) => setproductData({ ...productData, [e.target.name]: e.target.value })} />
                        <button className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2" type="submit" onClick={closeModal}>Update Product</button>
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
  )
}
export default AllProduct