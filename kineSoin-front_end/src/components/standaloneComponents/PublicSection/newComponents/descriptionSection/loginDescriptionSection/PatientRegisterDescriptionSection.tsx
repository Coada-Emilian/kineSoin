/**
 * @function PatientRegisterDescriptionSection
 *
 * This component renders the description section of the patient registration page. It
 * dynamically displays articles based on the current form order (`formOrder`) in the
 * registration process. It retrieves the relevant articles from the `registerFormArticles`
 * and `registerFormReverseArticles` arrays and uses the `ArticleRow` component to display
 * the content.
 *
 * @returns {JSX.Element} - The JSX structure containing the articles for the patient
 * registration description section.
 *
 * @example
 * <PatientRegisterDescriptionSection />
 */

import {
  registerFormArticles,
  registerFormReverseArticles,
} from '../../../../../../utils/constants/publicSection/standaloneComponents/descriptionSectionArticles/registerFormArticles';
import { usePatientRegisterContext } from '../../../../../../utils/contexts/PatientRegisterContext';
import ArticleRow from '../articles/ArticleRow';

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
