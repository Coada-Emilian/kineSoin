import {
  therapistLoginPageArticle,
  therapistLoginPageReverseArticle,
} from '../../../../../../utils/constants/public_section/standalone_components/description_section_articles/therapistLoginPageArticles';
import ArticleRow from '../articles/ArticleRow';

export default function TherapistLoginDescriptionSection() {
  const article = therapistLoginPageArticle;

  const reverseArticle = therapistLoginPageReverseArticle;
  return (
    <div className="bg-container py-12 rounded-tr-[75px]">
      <div className="flex flex-col md:gap-4">
        <ArticleRow
          articleImage={article.image}
          articleAlt={article.alt}
          articleParagraph={article.paragraph}
          articleTitle={article.title}
        />

        <ArticleRow
          isReversed
          articleImage={reverseArticle.image}
          articleAlt={reverseArticle.alt}
          articleParagraph={reverseArticle.paragraph}
          articleTitle={reverseArticle.title}
        />
      </div>
    </div>
  );
}
