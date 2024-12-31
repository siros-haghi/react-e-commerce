import React from 'react'
import {footer} from "../data/Data"
const Footer = () => {
  return (
    <div className='mt-10'>
      <div className="bg-gray-900">
        <div className="w-10/12 m-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 py-14">
            {footer.map((val,index)=>(
              <div className="text-gray-300" key={index}>
                <h1 className="text-xl mb-5 text-white font-bold">{val.header}</h1>
                <p>{val.content1}</p>
                <p>{val.content2}</p>
                <p>{val.content3}</p>
                <p>{val.content4}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer