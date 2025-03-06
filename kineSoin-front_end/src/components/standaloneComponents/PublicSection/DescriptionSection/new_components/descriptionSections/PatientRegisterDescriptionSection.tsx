import ArticleRow from './articles/ArticleRow';
import { IFormOrders } from '../../../../../../@types/componentTypes';
import {
  registerFormArticles,
  registerFormReverseArticles,
} from '../../../../../../utils/componentUtils/pageComponents/constants/publicSection/DescriptionSectionArticles/registerFormArticles';
import { usePatientRegisterContext } from '../../../../../../utils/contexts/PatientRegisterContext';

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
      <div className="flex flex-col">
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
