import {
  homePageFirstArticles,
  homePageSecondArticles,
} from '../../../../../utils/constants/public_section/standalone_components/description_section_articles/homePageArticles';
import HomePageArticle from './articles/HomePageArticle';

export default function HomePageDescriptionSection() {
  return (
    <div className="bg-container py-12 flex flex-col px-2 rounded-tr-[75px] shadow-lg">
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
