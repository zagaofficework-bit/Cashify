
import { largeArticles, smallArticles } from "../../../res/Data/Trend.js";

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



const TrendingSection = () => {
  return (
    <div className=" w-full px-6 py-10 bg-gray-100 mt-10">

      {/* Header */}
      <div className="flex justify-between items-center mb-6 ml-15  ">
        <h2 className="text-xl font-semibold">Trending Articles</h2>

        <button className="text-teal-500 text-sm">
          See all
        </button>
      </div>

      {/* Top 3 Articles */}
      <div className="grid md:grid-cols-3 gap-6 mb-10 max-w-7xl ml-20  ">
        {largeArticles.map((article, index) => (
          <TrendCard key={index} {...article} />
        ))}
      </div>

      {/* Bottom List */} 
      <div className="grid md:grid-cols-3 gap-6 ml-20">
        {smallArticles.map((article, index) => (
          <TrendSmallCard key={index} {...article} />
        ))}
      </div>

    </div>
  );
};

export default TrendingSection;