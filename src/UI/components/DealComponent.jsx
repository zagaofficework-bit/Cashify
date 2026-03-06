import DealCard from "./DealCard";
import {hotDeals} from "../../res/js/Deal.js";

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