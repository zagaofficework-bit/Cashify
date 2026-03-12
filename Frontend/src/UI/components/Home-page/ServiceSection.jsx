import ServiceCard from "../Card/ServiceCard.jsx";
import { services } from "../../../res/Data/Data.js";

const ServiceSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">Our Services</h2>
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-8 gap-3 md:gap-5 mb-5">
        {services.map((item, index) => (
          <ServiceCard key={index} image={item.image} title={item.title} path={item.path} />
        ))}
      </div>
    </div>
  );
};

export default ServiceSection;
