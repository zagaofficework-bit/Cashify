import ArticleCard from "./Articlecard.jsx";

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