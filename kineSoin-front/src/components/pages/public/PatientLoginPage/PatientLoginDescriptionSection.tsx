import {
  patientLoginPageArticle,
  patientLoginPageReverseArticle,
} from '../../../../utils/constants/publicSection/page/patientLoginPageArticles';
import ArticleRow from '../ArticleRow';

export default function PatientLoginDescriptionSection() {
  const article = patientLoginPageArticle;

  const reverseArticle = patientLoginPageReverseArticle;

  return (
    <div className="bg-container py-12 rounded-tr-[75px]">
      <div className="flex flex-col md:gap-4">
        <ArticleRow article={article} />

        <ArticleRow article={reverseArticle} />
      </div>
    </div>
  );
}
