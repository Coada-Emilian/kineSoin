import {
  homePageFirstArticles,
  homePageSecondArticles,
} from '../../../../utils/config/public/page/homePageArticles';
import HomePageArticle from './HomePageArticle';

export default function HomePageDescriptionSection() {
  return (
    <div className="bg-container py-12 flex flex-col px-2 rounded-tr-[75px] shadow-2xl">
      <div className="flex flex-wrap justify-around">
        {homePageFirstArticles.map((article, index) => (
          <HomePageArticle key={index} article={article} />
        ))}
      </div>

      <div className="flex flex-wrap justify-around">
        {homePageSecondArticles.map((article, index) => (
          <HomePageArticle key={index} article={article} />
        ))}
      </div>
    </div>
  );
}
