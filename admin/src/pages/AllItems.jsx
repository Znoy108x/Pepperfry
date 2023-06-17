/*
This page is used to fetch all the items from the data base and display them on the table and adding  edit , delete operations on them!
*/
import React, { Fragment, useState, useEffect, useContext, useRef } from 'react'
import Sidebar from "../components/Sidebar"
import axios from "axios"
import { toast } from "react-toastify"
import { DataGrid } from '@mui/x-data-grid'
import { Transition, Dialog } from '@headlessui/react'
import PanelContext from '../context/PanelContext'
import { Menu } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import DropDownAddItem from "../components/DropDownAddItem"

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const AllItems = () => {
  const i1 = useRef()
  const m1 = useRef()
  const m2 = useRef()
  const m3 = useRef()
  const m4 = useRef()
  const {ALL_PRODUCTS, allProducts, ALL_CATEGORIES, allCategory } = useContext(PanelContext)
  let [isOpen, setIsOpen] = useState(false)
  const [itemId, setitemId] = useState("")
  const [allItems, setAllItems] = useState([])
  const [itemData, setItemData] = useState({
    Name: "",
    Product: {
      Name: "Choose Product!"
    },
    Category: {
      Name: "Choose Category!"
    },
    Price: "",
    Discount: "",
    Description: "",
    ManufacturingId: "",
    ManufacturingDate: "",
    Image: "",
    Colors: [],
    Size: [],
    Gender: ""
  })


  const SET_ROW = () => {
    let rows = []
    axios.get("http://localhost:5000/api/all-items", { withCredentials: true }).then((res) => {
      res.data.message.map((ele) => {
        let cat_ele = {
          id: 0,
          name: "",
          image: "",
          product: "",
          category: "",
          admin_id: "",
          created_date: "",
          updated_date: ""
        }
        cat_ele.id = ele._id;
        cat_ele.name = ele.Name
        cat_ele.image = ele.Image
        cat_ele.product = ele.Product
        cat_ele.category = ele.Category;
        cat_ele.admin_id = ele.Admin
        cat_ele.created_date = ele.createdAt.split("T")[0];
        cat_ele.updated_date = ele.updatedAt.split("T")[0];
        rows.push(cat_ele);
      })
      setAllItems(rows)
    }).catch((err) => {
      toast.error(err.message)
    })
  }
  
  function closeModal() {
    setIsOpen(false)
  }
  function openModal() {
    setIsOpen(true)
  }
  const actionColumn = [
    {
      field: "action", headerName: "Action", width: 170, renderCell: (params) => {
        return <div className="flex  w-full justify-center space-x-4">
          <div className="px-2 py-1 rounded-full text-xs cursor-pointer bg-green-500 text-white hover:scale-105 duration-200 hover:bg-green-400" onClick={() => UPDATE_ITEM(params)}>Edit</div>
          <div className="px-2 py-1 rounded-full text-xs cursor-pointer bg-red-500 text-white hover:scale-105 duration-200 hover:bg-red-400" onClick={() => DELETE_ITEM(params)}>Delete</div>
        </div>
      }
    }
  ]
  const columns = [
    { field: "name", headerName: "Item Name", width: 170 },
    {
      field: 'image', headerName: 'Image', width: 200,
      renderCell: (params) => {
        return <div className="h-[170px] p-6 w-full">
          <img src={`http://localhost:5000${params.row.image}`} alt={params.name} className=" rounded-full w-ful h-full object-cover"/>
        </div>

      }
    },
    { field: 'product', headerName: 'Product Id', width: 210 },
    { field: 'category', headerName: 'Category Id', width: 210 },
    { field: 'admin_id', headerName: 'Creator Id', width: 210 },
    { field: 'created_date', headerName: 'Created At', width: 130 },
    { field: 'updated_date', headerName: 'Updated At', width: 130 }
  ];
  const DELETE_ITEM = (params) => {
    axios.delete(`http://localhost:5000/api/delete-item/${params.id}`, { withCredentials: true }).then((res) => {
      SET_ROW()
      toast.success(res.data.message)
    }).catch((err) => {
      toast.error(err.message)
    })
  }

  const IMAGE_NAME = (path) => {
    const lst = path.split("/")
    axios.delete(`http://localhost:5000/api/delete-image/${lst[3]}`, { withCredentials: true }).then((res) => {
      console.log(res.data.message)
    }).catch((err)=>{
      toast.error(err.message)
    })
  }
  const [toDo , settoDo] = useState({})
  const UPDATE_ITEM = (params) => {
    setitemId(params.id)
    axios.get(`http://localhost:5000/api/all-item/${params.id}`, { withCredentials: true }).then((res) => {
      settoDo(res.data.item[0])
      setItemData({
        Name: res.data.item[0].Name,
        Product: {
          Name: "Choose Product!"
        },
        Category: {
          Name: "Choose Category!"
        },
        Price: res.data.item[0].Price,
        Discount: res.data.item[0].Discount,
        Description: res.data.item[0].Description,
        ManufacturingId: res.data.item[0].ManufacturingId,
        ManufacturingDate: res.data.item[0].ManufacturingDate,
        Colors: [],
        Size: [],
        Gender: res.data.item[0].Gender,
      })
    }).catch((err) => {
      toast.error(err.message)
    })
    openModal()
  }

  useEffect(() => {
    SET_ROW()
    ALL_PRODUCTS()
    ALL_CATEGORIES(itemData.Product._id)
  }, [itemData])

  
  const HELPER = () =>{
    const ITEM_FORM = new FormData()
    ITEM_FORM.append("Name" , itemData.Name)
    ITEM_FORM.append("Product" ,itemData.Product._id )
    ITEM_FORM.append("Category" , itemData.Category._id)
    ITEM_FORM.append("Price" , itemData.Price)
    ITEM_FORM.append("Discount" , itemData.Discount)
    ITEM_FORM.append("Description" , itemData.Description)
    ITEM_FORM.append("ManufacturingId" , itemData.ManufacturingId)
    ITEM_FORM.append("ManufacturingDate" , itemData.ManufacturingDate)
    ITEM_FORM.append("Colors" , [])
    ITEM_FORM.append("Size" , [])
    ITEM_FORM.append("Gender" ,itemData.Gender )
    ITEM_FORM.append("Image" , i1.current.files[0])
    ITEM_FORM.append("MainImage" , m1.current.files[0])
    ITEM_FORM.append("MainImage" , m2.current.files[0])
    ITEM_FORM.append("MainImage" , m3.current.files[0])
    ITEM_FORM.append("MainImage" , m4.current.files[0])
    axios.put(`http://localhost:5000/api/update_item/${itemId}`, ITEM_FORM , {withCredentials : true}).then((res) => {
      toast.success("Item Updated !")
      SET_ROW()
    }).catch((err) => {
      toast.error(err.message)
    })
  }
  const HANDLE_EDIT_ITEM = (e) => {
    e.preventDefault()
    if(i1.current.files[0] !== undefined){
      IMAGE_NAME(toDo.Image)
    }
    if(m1.current.files[0] !== undefined && m2.current.files[0] !== undefined && m3.current.files[0] !== undefined && m4.current.files[0] !== undefined){
      toDo.MainImage.map((ele) => {
        IMAGE_NAME(ele)
      })
      HELPER()
    }else if(m1.current.files[0] !== undefined || m2.current.files[0] !== undefined || m3.current.files[0] !== undefined || m4.current.files[0] !== undefined){
      toast.error("Please select more image!")
    }else{
      HELPER()
    }
  }
  return (
    <div className="w-screen h-screen bg-slate-50 flex font-Baby_Urbanist relative overflow-hidden">
      <Sidebar />
      <div className="h-full w-[85%] flex flex-col ">
        <div className="w-full h-full flex flex-col bg-slate-50">
          <div className="w-full h-[10%]">
            <span className="font-dancing text-6xl font-semibold ml-16">All Items..</span>
          </div>
          <div className="w-full h-[90%] flex ">
            <DataGrid rows={allItems} columns={columns.concat(actionColumn)} pageSize={10} rowsPerPageOptions={[12]} checkboxSelection={false} sx={{
              "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                outline: "none !important",
              },
            }} getRowHeight={() => 'auto'} />
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
                  <Dialog.Panel className="h-[90vh] w-[80vw]  transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all flex items-center justify-center bg-baby_green">
                    <form onSubmit={HANDLE_EDIT_ITEM} className="px-10 h-[99.99%] w-[99.99%]  bg-white shadow-2xl rounded-xl flex flex-col p-4 space-y-3 ">
                      <span className=" font-semibold text-center text-3xl">Edit <span className='text-baby_purple'>Item</span> ...</span>
                      <div className="flex justify-between w-full h-full px-10 pt-10 ">
                        <div className="w-1/3 h-full flex  flex-col space-y-3">
                          <div className="flex flex-col space-y-2 ">
                            <span>Name</span>
                            <input type="text" placeholder='Category Name' className="outline-none bg-slate-200 border-gray-100 px-10 py-2 rounded-lg text-gray-800 tracking-wide" name="Name" value={itemData.Name} onChange={(e) => setItemData({ ...itemData, [e.target.name]: e.target.value })} />
                          </div>
                          <div className="flex space-x-5">
                            <DropDownAddItem data={allProducts} itemData={itemData} setItemData={setItemData} Cond="Product" />
                            <DropDownAddItem data={allCategory} itemData={itemData} setItemData={setItemData} Cond="Category" />
                          </div>
                          <div className="flex flex-col space-y-2">
                            <span>Price</span>
                            <input type="text" placeholder='Price' className="outline-none bg-slate-200 border-gray-100 px-10 py-2 rounded-lg text-gray-800 tracking-wide" name="Price" value={itemData.Price} onChange={(e) => setItemData({ ...itemData, [e.target.name]: e.target.value })} />
                          </div>
                          <div className="flex flex-col space-y-2">
                            <span>Discount</span>
                            <input type="text" placeholder='Discount' className="outline-none bg-slate-200 border-gray-100 px-10 py-2 rounded-lg text-gray-800 tracking-wide" name="Discount" value={itemData.Discount} onChange={(e) => setItemData({ ...itemData, [e.target.name]: e.target.value })} />
                          </div>
                          <div className="flex flex-col space-y-2 h-[30%]">
                            <span>Description</span>
                            <textarea type="text" placeholder='Description' className="h-full outline-none bg-slate-200 border-gray-100 px-10 py-2 rounded-lg text-gray-800 tracking-wide" name="Description" value={itemData.Description} onChange={(e) => setItemData({ ...itemData, [e.target.name]: e.target.value })} />
                          </div>
                        </div>
                        <div className="w-1/3 h-full flex flex-col space-y-5 ">
                          <span className="text-center text-xl font-semibold">Manufacturing Details</span>
                          <div className="flex space-x-5 w-full">
                            <input type="text" placeholder='Manu. Id' className="w-1/2 outline-none bg-slate-200 border-gray-100 px-10 py-2 rounded-lg text-gray-800 tracking-wide" name="ManufacturingId" value={itemData.ManufacturingId} onChange={(e) => setItemData({ ...itemData, [e.target.name]: e.target.value })} />

                            <input type="text" placeholder='Manu. Date' className="w-1/2 outline-none bg-slate-200 border-gray-100 px-10 py-2 rounded-lg text-gray-800 tracking-wide" name="ManufacturingDate" value={itemData.ManufacturingDate} onChange={(e) => setItemData({ ...itemData, [e.target.name]: e.target.value })} />
                          </div>
                          <Menu as="div" className="relative inline-block text-left">
                            <div>
                              <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                                Gender
                                <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
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
                                  {
                                    [
                                      {
                                        Name: "Male"
                                      },
                                      {
                                        Name: "Female"
                                      }
                                    ].map((ele) => (
                                      <Menu.Item key={ele.Name}>
                                        {({ active }) => (
                                          <span
                                            className={classNames(
                                              active ? 'bg-gray-100 text-gray-900 cursor-pointer' : 'text-gray-700',
                                              'block px-4 py-2 text-sm cursor-pointer'
                                            )} onClick={() => setItemData({ ...itemData, Gender: ele.Name })}>
                                            {ele.Name}
                                          </span>
                                        )}
                                      </Menu.Item>
                                    ))
                                  }
                                </div>
                              </Menu.Items>
                            </Transition>
                          </Menu>
                          <span className="text-center text-xl font-semibold">Upload Image</span>
                          <div className="flex flex-col space-y-2">
                            <span className="text-lg font-semibold">Show Case Image</span>
                            <input type="file" id="file-id" className="text-sm text-grey-500 file:mr-5 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:cursor-pointer hover:file:bg-amber-50 hover:file:text-amber-700" name="Image" ref={i1} />
                            <span className="text-lg font-semibold">Main Image</span>
                            <input type="file" id="file-id" className="text-sm text-grey-500 file:mr-5 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:cursor-pointer hover:file:bg-amber-50 hover:file:text-amber-700" name="MainImage1" ref={m1} />
                            <input type="file" id="file-id" className="text-sm text-grey-500 file:mr-5 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:cursor-pointer hover:file:bg-amber-50 hover:file:text-amber-700" name="MainImage2" ref={m2} />
                            <input type="file" id="file-id" className="text-sm text-grey-500 file:mr-5 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:cursor-pointer hover:file:bg-amber-50 hover:file:text-amber-700" name="MainImage3" ref={m3} />
                            <input type="file" id="file-id" className="text-sm text-grey-500 file:mr-5 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:cursor-pointer hover:file:bg-amber-50 hover:file:text-amber-700" name="MainImage4" ref={m4} />
                          </div>
                        </div>
                      </div>
                      <button className="w-1/3 mx-auto bg-baby_purple hover:bg-baby_sky text-white duration-300 rounded-3xl py-2 ripple-bg-baby_sky" type="submit"  onClick={closeModal}>Update Item</button>
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
export default AllItems