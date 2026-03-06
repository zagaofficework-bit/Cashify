const TrendCard = ({ image, title, desc, date }) => {
  return (
    <div className="space-y-3 cursor-pointer">

      <img
        src={image}
        alt={title}
        className="rounded-xl w-full h-[180px] object-cover"
      />

      <h3 className="font-semibold text-[15px] leading-5">
        {title}
      </h3>

      <p className="text-gray-500 text-sm line-clamp-3">
        {desc}
      </p>

      <p className="text-gray-400 text-xs">{date}</p>

    </div>
  );
};

export default TrendCard;