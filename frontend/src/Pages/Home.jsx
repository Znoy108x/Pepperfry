import React, { useEffect, useState } from 'react'
import Navbar from "../Components/Navbar"
import Slider from "../Components/Slider"
import banner1 from "../assets/banner1.jpg"
import { UilArrowRight } from '@iconscout/react-unicons'
import { useNavigate } from 'react-router-dom'
import Loader from '../Components/Loader';
import FooterMain from "../Components/FooterMain"

const Home = () => {
  const navigate = useNavigate()
  const shop_by_home = [
    {
      link: "https://ii2.pepperfry.com/media/wysiwyg/banners/Hp_section4_web_11112022_1.jpg",
      title: "Shop Living Room",
      nav: "/Furniture/Beds",
      prod: "635cbd8c4fbeb4c855d66be2",
      cat: "635cca0bed53db7cc0c4783c",
    },
    {
      link: "https://ii3.pepperfry.com/media/wysiwyg/banners/Hp_section4_web_11112022_2.jpg",
      title: "Shop Bed Room",
      nav: "/Furniture/Seating",
      prod: "635cbd8c4fbeb4c855d66be2",
      cat: "635cca00ed53db7cc0c47838",
    },
    {
      link: "https://ii1.pepperfry.com/media/wysiwyg/banners/Hp_section4_web_11112022_3.jpg",
      title: "Shop Dining Room",
      nav: "/Furniture/Dining",
      prod: "635cbd8c4fbeb4c855d66be2",
      cat: "635cca1eed53db7cc0c47840",
    },
    {
      link: "https://ii2.pepperfry.com/media/wysiwyg/banners/Hp_section4_web_11112022_4.jpg",
      title: "Shop Study Room",
      nav: "/Furniture/Chairs",
      prod: "635cbd8c4fbeb4c855d66be2",
      cat: "635cca05ed53db7cc0c4783a",
    }
  ]

  const deals_of_the_Day = [
    {
      link:"https://ii2.pepperfry.com/media/wysiwyg/banners/Hp_section6_web_11112022_2.jpg",
      title:"Get  52%  OFF",
      nav: "/Furniture/Chairs",
      prod: "635cbd8c4fbeb4c855d66be2",
      cat: "635cca05ed53db7cc0c4783a",
      discount : "52"
    },
    {
      link:"https://ii1.pepperfry.com/media/wysiwyg/banners/Hp_section6_web_11112022_1.jpg",
      title:"Get  32%  OFF",
      nav: "/Furniture/Chairs",
      prod: "635cbd8c4fbeb4c855d66be2",
      cat: "635cca05ed53db7cc0c4783a",
      discount : "32"
    },
    {
      link:"https://ii3.pepperfry.com/media/wysiwyg/banners/Hp_section6_web_11112022_3.jpg",
      title:"Get  45%  OFF",
      nav: "/Furniture/Chairs",
      prod: "635cbd8c4fbeb4c855d66be2",
      cat: "635cca05ed53db7cc0c4783a",
      discount : "45"
    },
  ]

  const inspirational_designs = [
    "https://cdn.taggbox.com/v7/https%3A%2F%2Fcloud.taggbox.com%2Fmedia%2F2022%2F07%2F183389%2Fimage_318161735-1666896243.webp?w=400&func=cover&ci_url_encoded=1",
    "https://cdn.taggbox.com/v7/https%3A%2F%2Fcloud.taggbox.com%2Fmedia%2F2022%2F06%2F178615%2Fimage_270825886-1667278204.jpg?w=400&func=cover&ci_url_encoded=1",
    "https://cdn.taggbox.com/v7/https%3A%2F%2Fcloud.taggbox.com%2Fmedia%2F2022%2F06%2F178615%2Fimage_1835441034-1667275739.webp?w=400&func=cover&ci_url_encoded=1",
    "https://cdn.taggbox.com/v7/https%3A%2F%2Fcloud.taggbox.com%2Fmedia%2F2022%2F07%2F183389%2Fimage_1924867295-1667447144.jpg?w=400&func=cover&ci_url_encoded=1",
    "https://cdn.taggbox.com/v7/https%3A%2F%2Fcloud.taggbox.com%2Fmedia%2F2022%2F07%2F183389%2Fimage_1724522643-1666896243.webp?w=400&func=cover&ci_url_encoded=1"
    ,"https://cdn.taggbox.com/v7/https%3A%2F%2Fcloud.taggbox.com%2Fmedia%2F2022%2F07%2F183389%2Fimage_744519337-1667542578.jpg?w=400&func=cover&ci_url_encoded=1"
    ,"https://cdn.taggbox.com/v7/https%3A%2F%2Fcloud.taggbox.com%2Fmedia%2F2022%2F08%2F183389%2F297805075_754695295859097_1857480586744741355_n.jpg?w=400&func=cover&ci_url_encoded=1",
    "https://cdn.taggbox.com/v7/https%3A%2F%2Fcloud.taggbox.com%2Fmedia%2F2022%2F06%2F178615%2Fimage_1273143974-1666805934.jpg?w=400&func=cover&ci_url_encoded=1",
    "https://cdn.taggbox.com/v7/https%3A%2F%2Fcloud.taggbox.com%2Fmedia%2F2022%2F07%2F183389%2Fimage_1013756189-1666014168.jpg?w=400&func=cover&ci_url_encoded=1",
    "https://cdn.taggbox.com/v7/https%3A%2F%2Fcloud.taggbox.com%2Fmedia%2F2022%2F06%2F178615%2Fimage_572447318-1666715073.webp?w=400&func=cover&ci_url_encoded=1",
    "https://cdn.taggbox.com/v7/https%3A%2F%2Fcloud.taggbox.com%2Fmedia%2F2022%2F07%2F183152%2Fimage_899612699-1667304505.jpg?w=400&func=cover&ci_url_encoded=1",
    "https://cdn.taggbox.com/v7/https%3A%2F%2Fi.pinimg.com%2Foriginals%2F99%2Ffc%2F49%2F99fc493ff341f8c46be4dc55db5e9cf9.jpg?w=400&func=cover&ci_url_encoded=1",
    "https://cdn.taggbox.com/v7/https%3A%2F%2Fcloud.taggbox.com%2Fmedia%2F2022%2F07%2F183152%2Fimage_1597840899-1667393836.jpg?w=400&func=cover&ci_url_encoded=1",
    "https://cdn.taggbox.com/v7/https%3A%2F%2Fcloud.taggbox.com%2Fmedia%2F2022%2F06%2F178615%2Fimage_927101028-1667304506.webp?w=400&func=cover&ci_url_encoded=1",
    "https://cdn.taggbox.com/v7/https%3A%2F%2Fcloud.taggbox.com%2Fmedia%2F2022%2F07%2F183389%2Fimage_721165977-1666729040.webp?w=400&func=cover&ci_url_encoded=1",
    "https://cdn.taggbox.com/v7/https%3A%2F%2Fcloud.taggbox.com%2Fmedia%2F2022%2F07%2F183389%2Fimage_368724528-1667275742.jpg?w=400&func=cover&ci_url_encoded=1"
  ]

  const [loading, setloading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setloading(false)
    }, 800);
  }, [])
  return (
    <>
      {
        loading ? <Loader /> : <div className="w-full min-h-screen flex flex-col font-Baby_PlayFair">
          <Navbar loading={loading} setloading={setloading} />
          <div className="flex w-[90%] h-[70vh] overflow-hidden mx-auto space-x-3">
            <Slider />
          </div>
          <img src={banner1} alt="" className="w-[90%] my-7 mx-auto" />
          <div className="flex flex-col space-y-7 justify-between mt-10 ">
            <span className="mx-auto text-5xl font-semibold tracking-wider text-gray-900">Shop By Room</span>
            <div className="grid grid-cols-4 gap-x-9 h-[42vh]  px-20">
              {
                shop_by_home.map((ele) => (
                  <div className="flex flex-col items-center space-y-2 cursor-pointer rounded-xl shadow-2xl" key={ele.title} onClick={() => navigate(ele.nav, { state: { product: { _id: ele.prod }, category: { _id: ele.cat } } })}>
                    <div className="w-full  overflow-hidden">
                      <img src={ele.link} alt="" className="hover:scale-105 duration-300" />
                    </div>
                    <span className="text-xl font-medium flex  items-center space-x-2"><span>{ele.title}</span> <UilArrowRight /></span>
                  </div>
                ))
              }
            </div>
          </div>
          <div className="px-20 flex flex-col space-y-7 justify-between my-20 ">
            <span className="text-5xl font-semibold tracking-wider text-gray-900">Best Deals</span>
            <div className="grid grid-cols-4 gap-x-9 h-[42vh]">
              {
                deals_of_the_Day.map((ele) => (
                  <div className="flex flex-col items-center space-y-2 cursor-pointer rounded-xl shadow-2xl" key={ele.title} onClick={() => navigate("/BestDeals", { state: { details : ele } })}>
                    <div className="w-full  overflow-hidden h-[85%]">
                      <img src={ele.link} alt="" className="hover:scale-105 duration-300" />
                    </div>
                    <span className="text-xl font-medium flex  items-center space-x-2"><span>{ele.title}</span> <UilArrowRight /></span>
                  </div>
                ))
              }
            </div>
          </div>
          <div className="px-20 flex flex-col space-y-7 justify-between my-20 ">
            <span className="text-5xl font-semibold tracking-wider text-gray-900">Inspire and Get Inspired</span>
            <div className="columns-4 ">
              {
                inspirational_designs.map((ele) => (
                  <div className="w-full  overflow-hidden cursor-pointer mb-4" key={ele}>
                    <img src={ele} alt="" className="hover:scale-105 duration-300" />
                  </div>
                ))
              }
            </div>
            <span className="text-3xl mx-auto hover:text-baby_orange2 cursor-pointer ">Wanna , See More !</span>
          </div>
          <FooterMain/>
        </div>
      }
    </>
  )
}
export default Home