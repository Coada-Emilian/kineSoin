import graphIcon from '/icons/health-graph.png';
import appointmentIcon from '/icons/appointment.png';
import healthcareIcon from '/icons/healthcare.png';
import priorityIcon from '/icons/priority.png';
import therapistIcon from '/icons/therapist.png';
import HomePageArticle from './HomePageArticle';
import ArticleRow from './ArticleRow';
import firstPatientLoginPhoto from '/images/patientConnexionPage_right.webp';
import secondPatientLoginPhoto from '/images/patientConnexionPage_left.webp';

interface DescriptionSectionProps {
  isHomePageDescriptionSection?: boolean;
  isPatientLoginPageDescriptionSection?: boolean;
}

export default function DescriptionSection({
  isHomePageDescriptionSection,
  isPatientLoginPageDescriptionSection,
}: DescriptionSectionProps) {
  const homePageFirstArticles = [
    {
      imgSrc: graphIcon,
      title: 'Un suivi adapté à vos besoins',
      description:
        'Prenez rendez-vous à tout moment, gérez vos consultations en quelques clics, et retrouvez vos informations de soin en toute simplicité.',
    },
    {
      imgSrc: appointmentIcon,
      title: 'Des rendez-vous à portée de main',
      description:
        'Choisissez entre des consultations en cabinet ou à distance, selon vos préférences, et organisez votre emploi du temps sans stress.',
    },
    {
      imgSrc: healthcareIcon,
      title: 'Vos soins accessibles en un clic',
      description:
        'Consultez vos dossiers, recevez des rappels et accédez à vos prescriptions en ligne, où que vous soyez.',
    },
  ];
  const homePageSecondArticles = [
    {
      imgSrc: priorityIcon,
      title: 'Votre santé, notre priorité',
      description:
        'Profitez de conseils personnalisés, suivez vos progrès et restez connecté à vos praticiens pour des soins continus.',
    },
    {
      imgSrc: therapistIcon,
      title: 'Des praticiens à votre écoute',
      description:
        'Communiquez avec vos thérapeutes à tout moment, posez vos questions et recevez des réponses claires et rapides.',
    },
  ];

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
      ) : isPatientLoginPageDescriptionSection ? (
        <div className="flex flex-col">
          <ArticleRow
            articleImage={firstPatientLoginPhoto}
            articleAlt="Homme faisant des exercices"
            articleParagraph="Nous sommes ravis de vous accueillir sur notre plateforme dédiée à la kinésithérapie. Ici, vous trouverez un espace conçu pour faciliter votre parcours de santé, vous permettant d’accéder à des soins de qualité et à des professionnels de santé qualifiés."
            articleTitle="Bienvenue dans la communauté kineSoin !"
          />
          <ArticleRow
            articleImage={secondPatientLoginPhoto}
            articleAlt="Homme faisant des exercices accompagnée d'une thérapeute"
            articleParagraph="Notre objectif est de vous accompagner à chaque étape de votre rétablissement. Profitez de notre interface conviviale pour prendre rendez-vous, échanger avec vos praticiens et suivre vos progrès. Ensemble, nous veillons à ce que votre expérience soit optimale et agréable."
            articleTitle="Votre bien-être, notre priorité"
            isReversed
          />
        </div>
      ) : null}
    </div>
  );
}
