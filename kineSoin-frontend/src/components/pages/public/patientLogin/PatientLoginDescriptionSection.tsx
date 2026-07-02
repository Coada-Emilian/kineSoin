import {
  patientLoginPageArticle,
  patientLoginPageReverseArticle,
} from '../../../../utils/config/public/page/patientLoginPageArticles';
import ArticleRow from '../common/ArticleRow';

export default function PatientLoginDescriptionSection() {
  const article = patientLoginPageArticle;

  const reverseArticle = patientLoginPageReverseArticle;

  return (
    <div className="bg-container py-12 flex flex-col px-2 rounded-tr-[75px] shadow-2xl">
      <div className="flex flex-col md:gap-4">
        <ArticleRow article={article} />

        <ArticleRow article={reverseArticle} />
      </div>
    </div>
  );
}
