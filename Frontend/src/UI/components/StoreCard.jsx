const StoreCard = ({ city, title, address, timing }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition w-[260px]">

      <span className="bg-black text-white text-xs px-3 py-1 rounded-md">
        {city}
      </span>

      <h3 className="font-semibold text-[15px] mt-3 leading-5">
        {title}
      </h3>

      <p className="text-gray-500 text-sm mt-2 line-clamp-2">
        {address}
      </p>

      <p className="text-gray-500 text-sm mt-3">
        Timings : {timing}
      </p>

      <button className="text-green-500 text-sm font-medium mt-3 flex items-center gap-1">
        View Details →
      </button>

    </div>
  );
};

export default StoreCard;