import ServiceCard from "../Card/ServiceCard.jsx";
import { services } from "../../../res/Data/Data.js";

const ServiceSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">Our Services</h2>
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-5">
        {services.map((item, index) => (
          <ServiceCard key={index} image={item.image} title={item.title} path={item.path} />
        ))}
      </div>
    </div>
  );
};

export default ServiceSection;
