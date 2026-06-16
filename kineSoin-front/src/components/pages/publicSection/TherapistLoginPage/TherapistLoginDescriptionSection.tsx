import {
  therapistLoginPageArticle,
  therapistLoginPageReverseArticle,
} from '../../../../utils/constants/publicSection/page/therapistLoginPageArticles';
import ArticleRow from '../ArticleRow';

export default function TherapistLoginDescriptionSection() {
  const article = therapistLoginPageArticle;

  const reverseArticle = therapistLoginPageReverseArticle;
  return (
    <div className="bg-container py-12 rounded-tr-[75px]">
      <div className="flex flex-col md:gap-4">
        <ArticleRow article={article} />

        <ArticleRow article={reverseArticle} />
      </div>
    </div>
  );
}
