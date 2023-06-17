/*
This is the orders page for the admin panel. It is used to fetch all the orders from the database and display them on the table !
*/

import React, { Fragment, useState, useEffect, useContext } from 'react'
import Sidebar from "../components/Sidebar"
import axios from "axios"
import { toast } from "react-toastify"
import { Transition, Dialog } from '@headlessui/react'
import DropDownOrders from "../components/DropDownOrders"
import ordersVideo from "../assets/orders.mp4"

const Orders = () => {
  const [Data,setData] = useState(["Order Placed" , "Dispatched" , "Delivered"])
  const [OrderData, setOrderData] = useState([])
  useEffect(() => {
    axios.get("http://localhost:5000/api/gellAllOrders").then((res) => {
      const data = res.data.Order_Data;
      console.log(data)
      setOrderData(data)
    }).catch((err) => {
      console.log(err)
    })
  }, [])
  const [isOpen, setIsOpen] = useState(false)
  function closeModal() {
    setIsOpen(false)
  }
  function openModal() {
    setIsOpen(true)
  }
  const [Details , setDetails] = useState({
    OID : "",
    PID : ""
  })
  const setOIDANDPID = (oid , pid) =>{
    openModal()
    setDetails({
      OID : oid,
      PID : pid
    })
  }
  const condition_order = (cond , oid , pid) => {
    if (cond === "Order Placed") {
      return <span className="text-xs bg-red-100 px-2 py-1 text-red-500" onClick={()=>setOIDANDPID(oid , pid)}>Order Placed</span>
    } else if (cond === "Dispatched") {
      return <span className="text-xs bg-blue-100 px-2 py-1 text-blue-500" onClick={()=>setOIDANDPID(oid , pid)}>Dispatched</span>
    } else {
      return <span className="text-xs bg-green-100 px-2 py-1 text-green-500" onClick={()=>setOIDANDPID(oid , pid)}>Delivered</span>
    }
  }
  const HANDLE_EDIT_TRACKING = () => {

  }
  return (
    <div className="w-screen h-screen bg-slate-50 flex font-Baby_Urbanist relative ">
      <Sidebar />
      <div className="w-full h-full flex flex-wrap gap-x-10 gap-y-10 overflow-y-scroll justify-center p-10">
        {
          OrderData.map((ele) => (
            <div className="flex flex-col space-y-4 bg-white shadow-xl rounded-3xl p-7 w-[45%] font-lora hover:scale-105 duration-300 cursor-pointer">
              <div className='flex justify-between font-lora'>
                <span className="font-semibold tracking-wider text-gray-800">Order ID</span>
                <span>{ele._id}</span>
              </div>
              <div className='flex justify-between'>
                <span className="font-semibold tracking-wider text-gray-800">Customer ID</span>
                <span>{ele.Customer}</span>
              </div>
              <div className="flex flex-col space-y-3">
                <span className="font-semibold tracking-wider text-gray-800 text-3xl">Products</span>
                <div className="flex flex-col space-y-2">
                  {
                    ele.Items.map((res) => (
                      <div className="flex space-x-4 justify-between">
                        <span className="text-sm tracking-wider text-gray-900">{res.Name}</span>
                        <span>
                          {
                            condition_order(res.tracking , ele._id , res._id)
                          }
                        </span>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          ))
        }
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
                  <form onSubmit={HANDLE_EDIT_TRACKING} className="h-[460px] w-[800px] px-10 flex space-x-3 items-center bg-white shadow-2xl rounded-xl">
                    <video width="50%" muted autoPlay loop>
                      <source src={ordersVideo} type="video/mp4" />
                      Sorry, your browser doesn't support embedded videos.
                    </video>
                    <div >
                      <DropDownOrders data={Data}  openModal={openModal} closeModal={closeModal} Details={Details}/>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}
export default Orders