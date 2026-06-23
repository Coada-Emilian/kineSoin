import {
  registerFormArticles,
  registerFormReverseArticles,
} from '../../../../utils/constants/publicSection/page/patientRegistrationArticles';
import { usePatientRegistrationContext } from '../../../../utils/functions/contextUtils/usePatientRegistrationContext';
import ArticleRow from '../ArticleRow';

export default function PatientRegistrationDescriptionSection() {
  const { formOrder } = usePatientRegistrationContext();

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
            <ArticleRow article={article} />

            <ArticleRow article={reverseArticle} />
          </>
        )}
      </div>
    </div>
  );
}
