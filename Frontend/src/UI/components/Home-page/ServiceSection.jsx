import ServiceCard from "../Card/ServiceCard.jsx";
import { services, sellDevices } from "../../../res/Data/Data.js";

const ServiceSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">

      {/* Our Services */}
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">
        Our Services
      </h2>

      <div className="
        grid 
        grid-cols-3 
        sm:grid-cols-4 
        md:grid-cols-4 
        lg:grid-cols-6 
        xl:grid-cols-7 
        gap-4 sm:gap-5 
        mb-6
      ">
        {services.map((item, index) => (
          <ServiceCard
            key={index}
            image={item.image}
            title={item.title}
            path={item.path}
          />
        ))}
      </div>

    </div>
  );
};

export default ServiceSection;