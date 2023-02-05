import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import Navbar from "../Components/Navbar"
import Furniture_Img from "../assets/ProductBanners/Furniture.jpg"
import axios from "axios"
import Footer from "../Components/Footer"
import { Carousel } from "flowbite-react"




const Furniture = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [cat, setCat] = useState([])
  const [hero, setHero] = useState([])
  const FETCH_ALL_Cats = (id) => {
    axios.get(`http://localhost:5000/api/category-prod/${id}`).then((res) => {
      let data1 = res.data.Categorys
      setCat(data1)
    }).catch((err) => {
      console.log(err)
    })
    axios.get(`http://localhost:5000/api/product-page/${id}`).then((res) => {
      let data2 = res.data.data;
      setHero(data2)
    }).catch((err) => {
      console.log(err)
    })
  }
  useEffect(() => {
    FETCH_ALL_Cats(location.state.product._id)
  }, [])

  return (
    <div className="w-full flex flex-col">
      <Navbar />
      <div className="mx-auto flex w-[90%] h-[40vh] overflow-hidden  space-x-3 mt-7">
        <div className="w-[10%] h-full py-3 flex flex-col space-y-3 ">
          <span className="font-Baby_PtSherif text-2xl font-medium tracking-wider  text-center">Furniture</span>
          {
            cat.map((ele) => (
              <span key={ele._id} className="font-Baby_PlayFair   cursor-pointer hover:scale-110 duration-300 hover:text-[#ec2326] text-md pl-4" onClick={() => navigate(`/Furniture/${ele.Name.replace(/\s+/g, "")}`, { state: { category: ele, categories: cat, product_name: location.state.product.Name, category_name: ele.Name } })}>{ele.Name}</span>
            ))
          }
        </div>
        <img src={Furniture_Img} alt="" className="w-[90%] h-full object-cover" />
      </div>
      <div className="min-h-screen w-full py-10">
        <h1 className="font-Baby_PlayFair text-6xl text-center">New Arrivals</h1>
        <div className="w-full flex flex-col space-y-7 pt-10 bg-gray-50">
          {
            hero.map((ele) => (
              <div key={ele.Name} className="w-full  min-h-[90vh]  px-10 pt-2 flex flex-col justify-center space-y-20 ">
                <span className="text-6xl font-Baby_PlayFair ml-7 font-medium ">{ele.Name}</span>
                <div className="w-full flex flex-wrap gap-x-9 gap-y-8 ">
                  {
                    ele.Data.map((ele2) => (
                      <div key={ele2._id} className="w-[22%]  flex flex-col min-h-[60vh] items-center py-2 rounded-xl shadow-2xl bg-white">
                        <div className="w-[95%] h-[80%]">
                          <Carousel slideInterval={5000}>
                            <img src={`http://localhost:5000${ele2.Image}`} alt="..." className="w-full h-full object-cover" />
                            <img src={`http://localhost:5000${ele2.MainImage[2]}`} alt="..." className="w-full h-full object-cover " />
                            <img src={`http://localhost:5000${ele2.MainImage[3]}`} alt="..." className="w-full h-full object-cover " />
                          </Carousel>
                        </div>
                        <span className="font-Baby_PlayFair mt-2 text-md text-center mx-5">{ele2.Name}</span>
                        <div className="flex w-full justify-center mt-4">
                          <button onClick={() => navigate(`/${ele2.Name.split(" ").join("-")}/detail`, { state: { Items_datail: ele2 } })} className="   bg-orange-100 text-orange-400 rounded-md px-2 py-1 hover:scale-110 duration-300 text-sm">See the Product</button>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            ))
          }
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default Furniture