const TrendSmallCard = ({ image, title, date }) => {
  return (
    <div className="flex gap-3 items-center cursor-pointer">

      <img
        src={image}
        alt={title}
        className="w-[120px] h-[70px] object-cover rounded-lg"
      />

      <div>
        <p className="text-sm font-medium leading-5">
          {title}
        </p>

        <p className="text-gray-400 text-xs mt-1">
          {date}
        </p>
      </div>

    </div>
  );
};

export default TrendSmallCard;