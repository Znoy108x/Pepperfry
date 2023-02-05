import React from 'react'
import loader from "../assets/loader.gif"
const Loader = () => {
    return (
        <div className="w-screen h-screen flex items-center justify-center ">
            <lottie-player src="https://assets4.lottiefiles.com/packages/lf20_wukqhhrq.json" background="transparent" speed="2.3" style={{width: "300px" ,  height: "300px"}} loop autoplay></lottie-player>
        </div>
    )
}
export default Loader