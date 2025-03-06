import ArticleRow from './ArticleRow';
import firstPatientLoginPhoto from '/images/patientConnexionPage_right.webp';
import secondPatientLoginPhoto from '/images/patientConnexionPage_left.webp';
import { IFormOrders } from '../../../../@types/componentTypes';
import {
  registerFormArticles,
  registerFormReverseArticles,
} from './utils/registerFormArticles';

interface PatientRegisterProps {
  formOrder: IFormOrders;
}

export default function PatientRegisterDescriptionSection({
  formOrder,
}: PatientRegisterProps) {
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
