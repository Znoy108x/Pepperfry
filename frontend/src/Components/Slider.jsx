import React from 'react'
import 'tw-elements';
import c1 from "../assets/c1.jpg"
import c2 from "../assets/c2.webp"
import c3 from "../assets/c3.jpg"
import c4 from "../assets/c4.jpg"
import c8 from "../assets/c8.jpg"
import c9 from "../assets/c9.webp"
import c10 from "../assets/c10.webp"
import c11 from "../assets/c11.jpg"
import c12 from "../assets/c12.jpg"
import c13 from "../assets/c13.jpg"


import { Carousel } from "flowbite-react"


const Slider = () => {
    return (
        <div className="h-full  w-full sm:h-64 xl:h-80 2xl:h-full shadow-xl">
            <Carousel slideInterval={3000}>
            <img src={c11} alt="..." className="w-full h-full object-cover" />
                <img src={c9} alt="..." className="w-full h-full object-cover" />
                <img src={c13} alt="..." className="w-full h-full object-cover" />
                <img src={c12} alt="..." className="w-full h-full object-cover" />

                <img src={c2} alt="..." className="w-full h-full object-cover" />
                <img src={c3} alt="..." className="w-full h-full object-cover" />
                <img src={c4} alt="..." className="w-full h-full object-cover" />
                <img src={c8} alt="..." className="w-full h-full object-cover" />
                <img src={c10} alt="..." className="w-full h-full object-cover" />
            </Carousel>
        </div>
    )
}
export default Slider