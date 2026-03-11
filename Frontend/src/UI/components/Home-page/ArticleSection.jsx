import Articles from "../Card/ArticlesCard.jsx";
import { refurbished, sellSmart } from "../../../res/Data/Data2.js";

const ArticleSection = () => {
  return (
    <>
      <Articles
        title="Better For Pocket. Buy Refurbished"
        data={refurbished}
      />

      <Articles
        title="Be Smart. Sell Smart"
        data={sellSmart}
      />
    </>
  );
};

export default ArticleSection;