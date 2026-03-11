import React from 'react'
import Category from './Category'
import BuyRefurbishedDevices from './Home-page/BuyRefurbishedDevices'
import { refurbishedProducts } from '../../res/Data/DevicesData'

const MobileBrand = ({brand}) => {
  return (
    <div>
        <div className='m-12'>
        <img src="https://s3ng.cashify.in/estore/4c5f04bf55fb46feba7b6a732de9225a.webp" alt="" />
        </div>
        <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex gap-6">

        {brand.map((card, index) => (
          <div
            key={index}
            className={`relative flex-1 rounded-2xl p-6 overflow-hidden ${card.bg}`}
          >
            {/* Text */}
            <div className={`z-10 relative ${card.text}`}>
              <h3 className="text-lg font-semibold">{card.title}</h3>
              <p className="text-sm mt-1">{card.subtitle}</p>

              <button className="mt-6 bg-white text-black px-4 py-2 rounded-lg text-sm font-medium">
                {card.button}
              </button>
            </div>

            {/* Image */}
            <img
              src={card.img}
              alt=""
              className="absolute right-0 bottom-0 h-40 object-contain"
            />
          </div>
        ))}

      </div>
    </div>
        <BuyRefurbishedDevices products={refurbishedProducts}/>
        <div className='m-12'>
        <img src="https://s3ng.cashify.in/estore/3c89e731aa3d40a6bed6b20cc14756d6.webp" alt="" />
    </div>
    <BuyRefurbishedDevices products={refurbishedProducts}/>
     <div className='m-12'>
        <img src="https://s3ng.cashify.in/estore/e2588df8c0934fb4a7add81e2a1286fb.webp" alt="" />
        <img src="https://s3ng.cashify.in/estore/b5990e6860914df1b87841e4d36eb936.webp" alt="" />
     </div>
    
    </div>
  )
}

export default MobileBrand