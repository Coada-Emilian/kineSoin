import ArticleRow from '../articles/ArticleRow';
import firstPatientLoginPhoto from '/images/patientConnexionPage_right.webp';
import secondPatientLoginPhoto from '/images/patientConnexionPage_left.webp';

export default function PatientLoginDescriptionSection() {
  const article = {
    image: firstPatientLoginPhoto,
    alt: 'Homme faisant des exercices',
    paragraph:
      '"Nous sommes ravis de vous accueillir sur notre plateforme dédiée à la kinésithérapie. Ici, vous trouverez un espace conçu pour faciliter votre parcours de santé, vous permettant d’accéder à des soins de qualité et à des professionnels de santé qualifiés."',
    title: 'Bienvenue dans la communauté kineSoin !',
  };

  const reverseArticle = {
    image: secondPatientLoginPhoto,
    alt: "Homme faisant des exercices accompagnée d'une thérapeute",
    paragraph:
      'Notre objectif est de vous accompagner à chaque étape de votre rétablissement. Profitez de notre interface conviviale pour prendre rendez-vous, échanger avec vos praticiens et suivre vos progrès. Ensemble, nous veillons à ce que votre expérience soit optimale et agréable.',
    title: 'Votre bien-être, notre priorité',
  };

  return (
    <div className="bg-container py-12 rounded-tr-[75px]">
      <div className="flex flex-col">
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
      </div>
    </div>
  );
}
