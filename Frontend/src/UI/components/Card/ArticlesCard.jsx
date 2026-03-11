

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

const Articles = ({ title, data }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold">{title}</h2>

        <button className="text-teal-500 text-sm font-medium">
          See all
        </button>
      </div>

      {/* Cards */}
      <div className="flex gap-5 overflow-x-auto pb-2">
        {data.map((item, index) => (
          <ArticleCard
            key={index}
            image={item.image}
            title={item.title}
          />
        ))}
      </div>

    </div>
  );
};

export default Articles;