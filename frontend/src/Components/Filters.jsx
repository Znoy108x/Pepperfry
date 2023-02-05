import React from 'react'
import { Radio, Checkbox } from "@material-tailwind/react";
const Filters = ({ fromBest }) => {
  return (
    <div className="w-full h-full bg-slate-1000 font-Baby_Urbanist space-y-8">
      <div className="border-b-2 border-gray-300 pb-8">
        <span className="text-gray-900 text-lg font-semibold pl-4">Sort by</span>
        <div className="flex flex-col mt-4">
          <span className="flex items-center">
            <Radio id="red" name="color" color="red" />
            <span className="font-normal text-gray-800">Highest Priced First</span>
          </span>
          <span className="flex items-center">
            <Radio id="red" name="color" color="red" />
            <span className="font-normal text-gray-800">Lowest Priced First</span>
          </span>
          <span className="flex items-center">
            <Radio id="red" name="color" color="red" />
            <span className="font-normal text-gray-800">Newest </span>
          </span>
        </div>
      </div>
      <div className="border-b-2 border-gray-300 pb-8">
        <span className="text-gray-900 text-lg font-bold pl-4">Price</span>
        <div className="flex flex-col mt-4">
          <span className="flex items-center">
            <Checkbox color="red" />
            <span className="font-normal text-gray-800">Under ₹ 3,000</span>
          </span>
          <span className="flex items-center">
            <Checkbox color="red" />
            <span className="font-normal text-gray-800">₹ 3,000 to ₹ 4,000</span>
          </span>
          <span className="flex items-center">
            <Checkbox color="red" />
            <span className="font-normal text-gray-800">₹ 4,000 to ₹ 5,000</span>
          </span>
          <span className="flex items-center">
            <Checkbox color="red" />
            <span className="font-normal text-gray-800">₹ 5,000 to ₹ 7,000</span>
          </span>
          <span className="flex items-center">
            <Checkbox color="red" defaultChecked />
            <span className="font-normal text-gray-800">Over ₹ 7,000</span>
          </span>
        </div>
      </div>
      {
        !fromBest && <div className="border-b-2 border-gray-300 pb-8">
          <span className="text-gray-900 text-lg font-semibold pl-4">Discount</span>
          <div className="flex flex-col mt-4">
            <span className="flex items-center">
              <Radio id="red" name="color" color="red" />
              <span className="font-normal text-gray-800">10 % and above</span>
            </span>
            <span className="flex items-center">
              <Radio id="red" name="color" color="red" />
              <span className="font-normal text-gray-800">20 % and above</span>
            </span>
            <span className="flex items-center">
              <Radio id="red" name="color" color="red" />
              <span className="font-normal text-gray-800">30 % and above </span>
            </span>
            <span className="flex items-center">
              <Radio id="red" name="color" color="red" />
              <span className="font-normal text-gray-800">40 % and above </span>
            </span>
          </div>
        </div>
      }
    </div>
  )
}

export default Filters