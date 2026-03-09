import React from 'react'
import { FaArrowRight } from "react-icons/fa";
const Shopbuy = ({title}) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <h2 className="text-2xl font-semibold mb-6">
       {title}
      </h2>

      <div className="flex gap-5 overflow-x-auto">

        {/* Card */}
        <div className="min-w-[140px] bg-gray-200 rounded-xl p-4">
          <p className="text-sm">UNDER</p>
          <h3 className="font-bold text-lg">₹9,999</h3>

          <button className="mt-3 bg-black text-white w-8 h-5 rounded-full flex items-center justify-center">
            <FaArrowRight size={10}/>
          </button>
        </div>

        <div className="min-w-[140px] bg-gray-200 rounded-xl p-4">
          <p className="text-sm">UNDER</p>
          <h3 className="font-bold text-lg">₹14,999</h3>

          <button className="mt-3 bg-black text-white w-8 h-5 rounded-full flex items-center justify-center">
            <FaArrowRight size={10}/>
          </button>
        </div>

        <div className="min-w-[140px] bg-gray-200 rounded-xl p-4">
          <p className="text-sm">UNDER</p>
          <h3 className="font-bold text-lg">₹19,999</h3>

          <button className="mt-3 bg-black text-white w-8 h-5 rounded-full flex items-center justify-center">
            <FaArrowRight size={10}/>
          </button>
        </div>

        <div className="min-w-[140px] bg-gray-200 rounded-xl p-4">
          <p className="text-sm">UNDER</p>
          <h3 className="font-bold text-lg">₹24,999</h3>

          <button className="mt-3 bg-black text-white w-8 h-5 rounded-full flex items-center justify-center">
            <FaArrowRight size={10}/>
          </button>
        </div>

        <div className="min-w-[140px] bg-gray-200 rounded-xl p-4">
          <p className="text-sm">UNDER</p>
          <h3 className="font-bold text-lg">₹29,999</h3>

          <button className="mt-3 bg-black text-white w-8 h-5 rounded-full flex items-center justify-center">
            <FaArrowRight size={10}/>
          </button>
        </div>

      </div>

    </div>
  )
}

export default Shopbuy