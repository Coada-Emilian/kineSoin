/**
 * @function HomePageDescriptionSection
 *
 * This component displays the main content of the homepage, divided into two sections of articles.
 * It maps over the `homePageFirstArticles` and `homePageSecondArticles` arrays (imported from a constants file),
 * rendering each article using the `HomePageArticle` component. The content is displayed in a responsive flex layout
 * with each section being wrapped in a `div` and styled with padding and rounded corners.
 *
 * @returns {JSX.Element} - A section that renders the homepage articles in two rows.
 *
 * @example
 * <HomePageDescriptionSection />
 */

import {
  homePageFirstArticles,
  homePageSecondArticles,
} from '../../../../../utils/componentUtils/pageComponents/constants/publicSection/DescriptionSectionArticles/homePageArticles';
import HomePageArticle from './articles/HomePageArticle';

export default function HomePageDescriptionSection() {
  return (
    <div className="bg-container py-12 flex flex-col px-2 rounded-tr-[75px]">
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
