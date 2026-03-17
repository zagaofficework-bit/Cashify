import { Link } from "react-router-dom";
import { services } from "../../../res/Data/Data.js";

const ServiceSection = () => {
  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">

        {/* Header */}
        <div className=" text-center items-center gap-8 mb-8">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 tracking-tight">Our Services</h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3 md:gap-5">
          {services.map((item, index) => (
            <Link
              to={item.path}
              key={index}
              className="group flex flex-col items-center text-center cursor-pointer"
            >
              {/* Icon box */}
              <div className="w-full aspect-square flex items-center justify-center bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden shadow-sm group-hover:shadow-md group-hover:bg-teal-50 group-hover:border-teal-200 transition-all duration-200 p-2">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-200"
                />
              </div>

              {/* Title */}
              <p className="text-[11px] md:text-xs font-semibold text-gray-600 mt-2.5 leading-snug group-hover:text-teal-600 transition-colors duration-150 px-1">
                {item.title}
              </p>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ServiceSection;