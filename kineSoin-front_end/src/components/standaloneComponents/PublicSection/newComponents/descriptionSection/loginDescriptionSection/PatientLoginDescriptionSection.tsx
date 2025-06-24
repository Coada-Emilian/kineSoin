import {
  patientLoginPageArticle,
  patientLoginPageReverseArticle,
} from '../../../../../../utils/constants/publicSection/standaloneComponents/descriptionSectionArticles/patientLoginPageArticles';
import ArticleRow from '../articles/ArticleRow';

export default function PatientLoginDescriptionSection() {
  const article = patientLoginPageArticle;

  const reverseArticle = patientLoginPageReverseArticle;

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
