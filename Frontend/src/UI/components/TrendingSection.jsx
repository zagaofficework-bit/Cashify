import TrendCard from "./TrendCard.jsx";
import TrendSmallCard from "./TrendSmallCard.jsx";
import { largeArticles, smallArticles } from "../../res/js/Trend.js";

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