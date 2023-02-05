import React from 'react'

const Dummy = () => {
  const data = [
    {
      name : "Sofa1" , 
      pop : "1"
    } ,
    {
      name : "Sofa2" , 
      pop : "2"
    } ,
    {
      name : "Sofa3" , 
      pop : "3"
    } ,
    {
      name : "Sofa4" , 
      pop : "4"
    } ,
    {
      name : "Sofa5" , 
      pop : "5"
    } ,
    {
      name : "Sofa6" , 
      pop : "6"
    } ,
  ]
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex space-x-10 p-10">
        {
          data.map((ele) =>(
            <div key = {ele.name} className="relative group">
              <span className="font-dancing font-bold tracking-wider bg-baby_cyan text-cyan-100 px-2 py-1 rounded-md absolute -top-10 left-2 hidden group-hover:block duration-200 group-hover:animate-fade-in-down">{ele.pop}</span>
              <span className="font-dancing font-bold tracking-wider cursor-pointer">{ele.name}</span>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Dummy