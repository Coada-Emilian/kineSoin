import { usePatientRegistrationContext } from '../../../../hooks/context/usePatientRegistrationContext';
import {
  registerFormArticles,
  registerFormReverseArticles,
} from '../../../../utils/config/public/page/patientRegistrationArticles';
import ArticleRow from '../common/ArticleRow';

export default function PatientRegistrationDescriptionSection() {
  const { formOrder } = usePatientRegistrationContext();

  const article = registerFormArticles.find(
    (article) => article.formOrder === formOrder
  );

  const reverseArticle = registerFormReverseArticles.find(
    (article) => article.formOrder === formOrder
  );

  return (
    <div className="bg-container py-12 flex flex-col px-2 rounded-tr-[75px] shadow-2xl">
      <div className="flex flex-col md:gap-4">
        {article && reverseArticle && (
          <>
            <ArticleRow article={article} />

            <ArticleRow article={reverseArticle} />
          </>
        )}
      </div>
    </div>
  );
}
