import {
  registerFormArticles,
  registerFormReverseArticles,
} from '../../../../../utils/componentUtils/pageComponents/constants/publicSection/DescriptionSectionArticles/registerFormArticles';
import { usePatientRegisterContext } from '../../../../../utils/contexts/PatientRegisterContext';
import ArticleRow from './articles/ArticleRow';

export default function PatientRegisterDescriptionSection() {
  const { formOrder } = usePatientRegisterContext();

  const article = registerFormArticles.find(
    (article) => article.formOrder === formOrder
  );

  const reverseArticle = registerFormReverseArticles.find(
    (article) => article.formOrder === formOrder
  );

  return (
    <div className="bg-container py-12 rounded-tr-[75px]">
      <div className="flex flex-col md:gap-4">
        {article && reverseArticle && (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}
