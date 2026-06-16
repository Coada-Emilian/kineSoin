import HomePageArticle from '../newComponents/descriptionSection/articles/HomePageArticle';
import ArticleRow from '../newComponents/descriptionSection/articles/ArticleRow';

import {
  homePageFirstArticles,
  homePageSecondArticles,
} from '../../../../../utils/componentUtils/pageComponents/constants/publicSection/DescriptionSectionArticles/homePageArticles';
import { articleElements } from '../../../../utils/constants/unused/articleElements';
import { useEffect } from 'react';

interface DescriptionSectionProps {
  isHomePageDescriptionSection?: boolean;

  isPatientLoginPageDescriptionSection?: boolean;

  isTherapistLoginPageDescriptionSection?: boolean;

  isPatientRegisterFirstFormPageDescriptionSection?: boolean;

  isPatientRegisterSecondFormPageDescriptionSection?: boolean;

  isPatientRegisterThirdFormPageDescriptionSection?: boolean;

  isPatientConfirmationPageDescriptionSection?: boolean;
}

export default function DescriptionSection({
  isHomePageDescriptionSection,

  isPatientLoginPageDescriptionSection,

  isTherapistLoginPageDescriptionSection,

  isPatientRegisterFirstFormPageDescriptionSection,

  isPatientRegisterSecondFormPageDescriptionSection,

  isPatientRegisterThirdFormPageDescriptionSection,

  isPatientConfirmationPageDescriptionSection,
}: DescriptionSectionProps) {
  const {
    articles: { articleImage, articleAlt, articleParagraph, articleTitle },
    reverseArticles: {
      reverseArticleImage,
      reverseArticleAlt,
      reverseArticleParagraph,
      reverseArticleTitle,
    },
  } = articleElements({
    isPatientLoginPageDescriptionSection,
    isTherapistLoginPageDescriptionSection,
    isPatientRegisterFirstFormPageDescriptionSection,
    isPatientRegisterSecondFormPageDescriptionSection,
    isPatientRegisterThirdFormPageDescriptionSection,
    isPatientConfirmationPageDescriptionSection,
  });

  return (
    <div className="bg-container py-12 flex flex-col px-2 rounded-tr-[75px]">
      {isHomePageDescriptionSection ? (
        <>
          <div className="flex flex-wrap justify-around">
            {' '}
            {homePageFirstArticles.map((article, index) => (
              <HomePageArticle key={index} article={article} />
            ))}
          </div>
          <div className="flex flex-wrap justify-around">
            {' '}
            {homePageSecondArticles.map((article, index) => (
              <HomePageArticle key={index} article={article} />
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col">
          <ArticleRow
            articleImage={articleImage}
            articleAlt={articleAlt}
            articleParagraph={articleParagraph}
            articleTitle={articleTitle}
          />

          <ArticleRow
            isReversed
            articleImage={reverseArticleImage}
            articleAlt={reverseArticleAlt}
            articleParagraph={reverseArticleParagraph}
            articleTitle={reverseArticleTitle}
          />
        </div>
      )}
    </div>
  );
}
