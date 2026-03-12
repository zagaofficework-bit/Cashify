import { largeArticles, smallArticles } from "../../../res/Data/Trend.js";

const TrendCard = ({ image, title, desc, date }) => (
  <div className="space-y-2 md:space-y-3 cursor-pointer">
    <img src={image} alt={title} className="rounded-xl w-full h-[140px] md:h-[180px] object-cover" />
    <h3 className="font-semibold text-sm md:text-[15px] leading-5">{title}</h3>
    <p className="text-gray-500 text-xs md:text-sm line-clamp-3">{desc}</p>
    <p className="text-gray-400 text-xs">{date}</p>
  </div>
);

const TrendSmallCard = ({ image, title, date }) => (
  <div className="flex gap-3 items-center cursor-pointer">
    <img src={image} alt={title} className="w-[90px] h-[56px] md:w-[120px] md:h-[70px] object-cover rounded-lg flex-shrink-0" />
    <div>
      <p className="text-xs md:text-sm font-medium leading-5">{title}</p>
      <p className="text-gray-400 text-xs mt-1">{date}</p>
    </div>
  </div>
);

const TrendingSection = () => (
  <div className="w-full px-4 md:px-6 py-6 md:py-10 bg-gray-100 mt-6 md:mt-10">
    <div className="flex justify-between items-center mb-4 md:mb-6 max-w-7xl mx-auto">
      <h2 className="text-lg md:text-xl font-semibold">Trending Articles</h2>
      <button className="text-teal-500 text-sm">See all</button>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-10 max-w-7xl mx-auto">
      {largeArticles.map((article, index) => <TrendCard key={index} {...article} />)}
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-7xl mx-auto">
      {smallArticles.map((article, index) => <TrendSmallCard key={index} {...article} />)}
    </div>
  </div>
);

export default TrendingSection;
