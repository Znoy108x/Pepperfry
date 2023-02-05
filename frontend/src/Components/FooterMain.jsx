import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useRef } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const FooterMain = () => {
    const navigate = useNavigate()
    const [navigationData, setNavigationData, getValue] = useState([])
    const SET_NAV = async () => {
        const data = []
        axios.get("http://localhost:5000/api/get-products").then((res) => {
            res.data.Products.map((ele) => {
                const singleProd = {
                    Title: ele.Name,
                    ProductId: ele._id,
                    Categories: []
                }
                axios.get(`http://localhost:5000/api/category-prod/${ele._id}`).then((res2) => {
                    res2.data.Categorys.map((ele2) => {
                        const productCategoryData = {
                            Title: ele2.Name,
                            CategoryId: ele2._id
                        }
                        singleProd.Categories.push(productCategoryData)
                    })
                }).catch((err) => {
                    console.log(err)
                })
                data.push(singleProd)
            })
        }).catch((err) => {
            console.log(err)
        })
        await setNavigationData(data)
    }
    useEffect(() => {
        SET_NAV()
    }, [])
    const [now, setNow] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setNow(true)
        }, 1000)
    }, [])

    return (
        <div className="w-full flex flex-wrap  h-[50vh] relative justify-center pt-10 gap-x-8">
            <img src="https://wakefitdev.gumlet.io/consumer-react/banners/static-common-banner.jpg" alt="" className="absolute w-screen h-[50vh]" />
            {
                now && navigationData.map((ele) => (
                    <div key={ele.ProductId} className=" flex flex-col space-y-2   pl-10 z-50 items-center mt-5">
                        <span className="text-gray-900 text-xl font-medium">{ele.Title}</span>
                        <div className="flex flex-col space-y-2 items-center">
                            {
                                ele.Categories.map((ele2) => (
                                    <span className="text-gray-900 cursor-pointer hover:text-baby_orange2 hover:scale-105 duration-300" key={ele2.CategoryId} onClick={() => navigate(`/${ele.Title}/${ele2.Title}`, { state: { product: { _id: ele.ProductId }, category: { _id: ele2.CategoryId } } })}>{ele2.Title}</span>
                                ))
                            }
                        </div>
                    </div>
                ))
            }
            <div className="flex flex-col space-y-3 z-50 w-32 items-center mt-5" >
                <span className="text-gray-900 text-xl font-medium">More Links</span>
                <span className="text-gray-900 cursor-pointer hover:text-baby_orange2 hover:scale-105 duration-300">Contact Us</span>
                <span className="text-gray-900 cursor-pointer hover:text-baby_orange2 hover:scale-105 duration-300">About Us</span>
            </div>
        </div>
    )
}

export default FooterMain