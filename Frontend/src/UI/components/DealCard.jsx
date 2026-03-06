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

export default DealCard;