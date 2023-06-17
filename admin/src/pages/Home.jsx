/*
This is the dashboard for showing total number of products , categories & items present in the data base, along with the number of users , top performers and top selling products !
*/
import React, { useState } from 'react'
import Sidebar from "../components/Sidebar"
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined';
import BubbleChartOutlinedIcon from '@mui/icons-material/BubbleChartOutlined';
import DeviceHubOutlinedIcon from '@mui/icons-material/DeviceHubOutlined';
import report2 from "../assets/report2.png"
import LineChartComp from "../components/LineChartComp"
import OrdersGraphComp from "../components/OrdersGraphComp"
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import BlurOnOutlinedIcon from '@mui/icons-material/BlurOnOutlined';
const Home = () => {
  const [subHome, setSubHome] = useState("Products")
  return (
    <div className="w-screen h-screen bg-white flex font-Baby_Urbanist relative ">
      <Sidebar setSubHome={setSubHome} />
      <div className="h-full w-[85%] bg-white overflow-y-scroll">
        <div className="w-full h-full flex flex-col space-y-5">
          <div className='w-full h-[30%] pt-5 flex flex-col'>
            <span className="text-5xl font-roman ml-10 font-black text-baby_gray h-[20%]">Dashboard</span>
            <div className="flex w-full justify-between px-10 h-[80%]">
              <div className="h-4/5 w-[68%] font-roman text-baby_text2 mt-9  gap-x-9  grid grid-cols-3 ">
                <div className=" h-4/5 flex space-x-10 rounded-lg pl-5 items-center shadow-md bg-slate-50 shadow-orange-200 w-full">
                  <div className='border-2 border-orange-200 p-1 rounded-full '>
                    <div className='rounded-full bg-orange-100 w-12 h-12 flex items-center justify-center '>
                      <CategoryOutlinedIcon className=" text-orange-500" fontSize="large" />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <span className="font-romeo text-3xl font-bold">2500</span>
                    <span className="font-romeo font-semibold tracking-wide">Products</span>
                  </div>
                </div>

                <div className=" h-4/5 flex space-x-10 rounded-lg pl-5 items-center shadow-md bg-slate-50 shadow-rose-200 w-full">
                  <div className='border-2 border-rose-200 p-1 rounded-full'>
                    <div className='rounded-full bg-rose-100 w-12 h-12 flex items-center justify-center '>
                      <BusinessCenterOutlinedIcon className=" text-rose-500" fontSize="large" />
                    </div>
                  </div>

                  <div className="flex flex-col w-1/3">
                    <span className="font-romeo text-3xl font-bold">300</span>
                    <span className="font-romeo font-semibold tracking-wide">Categories</span>
                  </div>
                </div>

                <div className="h-4/5 flex space-x-10 rounded-lg pl-5 items-center shadow-md bg-slate-50 shadow-teal-200 w-full">
                  <div className='border-2 border-teal-200 p-1 rounded-full'>
                    <div className='rounded-full bg-teal-100 w-12 h-12 flex items-center justify-center '>
                      <BlurOnOutlinedIcon className=" text-teal-500" fontSize="large" />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-romeo text-3xl font-bold">5500</span>
                    <span className="font-romeo font-semibold tracking-wide">Items</span>
                  </div>
                </div>
              </div>
              <div className="w-[30%] h-full bg-baby_orange relative rounded-2xl overflow-hidden flex ">
                <div className="w-1/3 h-full flex flex-col py-5 px-6 justify-center space-y-3">
                  <span className="z-50 flex flex-col text-2xl">
                    <span className="text-baby_orange2 text-xl font-bold">Report</span>
                    <span className="text-sm text-baby_gray font-bold">a issue</span></span>
                  <button className="z-50 bg-baby_orange2  px-8 py-1 text-white flex items-center justify-center hover:scale-105 duration active:scale-95 hover:bg-rose-500 duration-300">Now</button>
                </div>
                <div className="w-2/3 h-full overflow-hidden  flex items-center justify-center">
                  <img src={report2} alt="" className="h-[100%] w-[88%]" />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-[40%]  flex">
            <div className="w-[68%] h-full  flex flex-col ">
              <span className="text-4xl font-roman font-black tracking-wide text-baby_gray ml-10 mt-3 mb-3">Activity</span>
              <LineChartComp />
            </div>
            <div className="w-[32%] h-full  pl-4 pt-2">
              <span className="text-4xl font-bold font-roman text-baby_gray">Top Performers</span>
              <div className="flex flex-col space-y-3 pt-3">
                <div className="flex justify-between items-center pr-10">
                  <img src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="" className="rounded-full w-12 font-roman" />
                  <span className="w-1/4 font-black tracking-wide">Abhay</span>
                  <span className="font-light text-xs">abhayb2002@gmail.com</span>
                  <span className="">24</span>
                </div>
                <div className="flex justify-between items-center pr-10">
                  <img src="https://t4.ftcdn.net/jpg/02/32/98/33/360_F_232983351_z5CAl79bHkm6eMPSoG7FggQfsJLxiZjY.jpg" alt="" className="rounded-full w-12 font-roman object-cover" />
                  <span className="w-1/4 font-black tracking-wide">Aniket</span>
                  <span className="font-light text-xs">aniker2002@gmail.com</span>
                  <span className="">18</span>
                </div>
                <div className="flex justify-between space-x-5 items-center pr-10">
                  <img src="https://images.unsplash.com/photo-1584997159889-8bb96d0a2217?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8aHVtYW58ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="" className="rounded-full w-12 font-roman" />
                  <span className="w-1/4 font-black tracking-wide">Aman</span>
                  <span className="font-light text-xs">aman2002@gmail.com</span>
                  <span className="">16</span>
                </div>
                <div className="flex justify-between items-center pr-10">
                  <img src="https://i.pinimg.com/236x/91/81/cc/9181ccc00cb60e85a144f929677aa6a3.jpg" alt="" className="rounded-full w-12 h-12 font-roman" />
                  <span className="w-1/4 font-black tracking-wide">Vishnu</span>
                  <span className="font-light text-xs">harekrishna@gmail.com</span>
                  <span className="">12</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-[23%] overflow-hidden  flex justify-start">
            <div className="w-[40%] h-full bg-baby_cyan_lite rounded-2xl mx-auto flex space-x-10">
              <div className="my-auto ml-4 h-[94%] w-1/3 flex flex-col space-y-4 items-center justify-center bg-baby_cyan rounded-3xl text-white">
                <span className="font-black text-3xl font-roman">Orders</span>
                <span className="text-xs font-bold text-center">Your order stats for 1 week period</span>
              </div>
              <div className="h-full w-2/3 pl-8">
                <OrdersGraphComp />
              </div>
            </div>
            <div className="w-[43%] h-full  rounded-2xl flex flex-col mr-20 bg-green-100">
              <span className="text-3xl font-roman text-center font-bold tracking-wide text-baby_gray h-1/3 mt-3"><span className="text-green-500">Profitable</span> Orders</span>
              <div className="flex w-full h-2/3 px-10 py-2 space-x-16 shadow-2xl">
                <div className='h-full flex flex-col text-center'>
                  <span className="h-1/3 font-bold text-baby_gray font-roman">Order ID</span>
                  <span className="h-1/3 font-bold text-baby_gray font-roman">Amount</span>
                  <span className="h-1/3 font-bold text-baby_gray font-roman">Deadline</span>
                </div>
                <div className="flex space-x-9 ">
                  <div className='h-full flex flex-col text-center'>
                    <span className="h-1/3 ">20001016001</span>
                    <span className="h-1/3 flex justify-between">$ 3200 <ArrowUpwardOutlinedIcon className="text-green-500 animate-bounce" fontSize="small" /></span>
                    <span className="h-1/3 ">23-10-2022</span>
                  </div>
                  <div className='h-full flex flex-col text-center'>
                    <span className="h-1/3 ">20001016002</span>
                    <span className="h-1/3 flex justify-between">$ 3200 <ArrowUpwardOutlinedIcon className="text-green-500 animate-bounce" fontSize="small" /></span>
                    <span className="h-1/3 ">25-10-2022</span>
                  </div>
                  <div className='h-full flex flex-col text-center'>
                    <span className="h-1/3 ">20001016002</span>
                    <span className="h-1/3 flex justify-between">$ 3200 <ArrowUpwardOutlinedIcon className="text-green-500 animate-bounce" fontSize="small" /></span>
                    <span className="h-1/3 ">25-10-2022</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Home