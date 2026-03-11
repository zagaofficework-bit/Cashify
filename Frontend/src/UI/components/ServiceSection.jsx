import ServiceCard from "./ServiceCard";
import { services, sellDevices } from "../../res/js/Data.js"
const ServiceSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-6">

      {/* Our Services */}
      <h2 className="text-2xl font-semibold mb-6">Our Services</h2>

      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-5 mb-10">
        {services.map((item, index) => (
          <ServiceCard
            key={index}
            image={item.image}
            title={item.title}
            path={item.path}
          />
        ))}
      </div>

      {/* Sell Devices */}

    </div>
  );
};

export default ServiceSection;