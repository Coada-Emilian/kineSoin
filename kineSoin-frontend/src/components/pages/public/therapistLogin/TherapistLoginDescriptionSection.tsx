import {
  therapistLoginPageArticle,
  therapistLoginPageReverseArticle,
} from '../../../../utils/config/public/page/therapistLoginPageArticles';
import ArticleRow from '../common/ArticleRow';

export default function TherapistLoginDescriptionSection() {
  const article = therapistLoginPageArticle;

  const reverseArticle = therapistLoginPageReverseArticle;
  return (
    <div className="bg-container py-12 flex flex-col px-2 rounded-tr-[75px] shadow-2xl">
      <div className="flex flex-col md:gap-4">
        <ArticleRow article={article} />

        <ArticleRow article={reverseArticle} />
      </div>
    </div>
  );
}
