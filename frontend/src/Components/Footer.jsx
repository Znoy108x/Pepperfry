import React from 'react'
import ForwardToInboxOutlinedIcon from '@mui/icons-material/ForwardToInboxOutlined';
const Footer = () => {
  return (
    <div className="w-full flex flex-col items-center py-8 bg-gray-100 font-Baby_Urbanist mt-20">
        <div className="flex flex-col justify-center w-1/3 space-y-7">
            <span className="text-gray-800 text-center">You’ve Browsed Our Range Of <span className="text-baby_orange2 font-bold">Square Bean Bags with Beans</span> We Can Email You When We Add More:</span>
            <div className="flex space-x-3 bg-slate-200 px-3 py-2 items-center justify-center">
              <ForwardToInboxOutlinedIcon/>
              <input type="email" placeholder='Enter Your Email ID' className="h-10 px-4 py-1  outline-none text-baby_orange2 "/>
            </div>
        </div>
        <div className=""> 

        </div>
    </div>
  )
}

export default Footer