import ServiceCard from "./ServiceCard";
import { services, sellDevices } from "../../res/js/Data.js"

const SellOldDevice = () => {
  return (
     <div className="max-w-7xl mx-auto px-6 py-6">
    <h2 className="text-2xl font-semibold mb-6">
        Sell Your Old Device
      </h2>

      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-5">
        {sellDevices.map((item, index) => (
          <ServiceCard
            key={index}
            image={item.image}
            title={item.title}
          />
        ))}
      </div>
      </div>

  )
}

export default SellOldDevice