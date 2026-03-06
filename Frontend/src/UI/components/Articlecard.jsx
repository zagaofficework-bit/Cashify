const ArticleCard = ({ image, title }) => {
  return (
    <div className="relative w-[280px] h-[150px] rounded-xl overflow-hidden cursor-pointer group">

      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Title */}
      <div className="absolute bottom-3 left-3 right-3">
        <p className="text-white text-sm font-semibold line-clamp-2">
          {title}
        </p>
      </div>

    </div>
  );
};

export default ArticleCard;