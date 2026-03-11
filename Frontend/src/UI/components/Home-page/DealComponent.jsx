
import {hotDeals} from "../../../res/Data/Deal.js";

const DealCard = ({ title, image, bg }) => {
  return (
    <div
      className={`relative rounded-xl p-6 flex items-center justify-between w-[280px] h-[140px] ${bg}`}
    >
      {/* Left Content */}
      <div>
        <h3 className="text-lg font-semibold leading-6">
          {title}
        </h3>

        <button className="mt-6 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow">
          →
        </button>
      </div>

      {/* Image */}
      <img
        src={image}
        alt={title}
        className="h-[90px] object-contain"
      />
    </div>
  );
};


const DealComponent = () => {
  return (
    <div className="bg-gray-100 py-10">

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <h2 className="text-2xl font-semibold">Hot Deals</h2>
        <p className="text-gray-500 text-sm mb-6">
          Exciting offers for more value
        </p>

        {/* Cards */}
        <div className="flex gap-6 flex-wrap">
          {hotDeals.map((deal, index) => (
            <DealCard
              key={index}
              title={deal.title}
              image={deal.image}
              bg={deal.bg}
            />
          ))}
        </div>

      </div>

    </div>
  );
};

export default DealComponent;