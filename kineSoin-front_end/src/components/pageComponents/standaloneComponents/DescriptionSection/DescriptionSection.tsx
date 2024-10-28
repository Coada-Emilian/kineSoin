import graphIcon from '/icons/health-graph.png';
import appointmentIcon from '/icons/appointment.png';
import healthcareIcon from '/icons/healthcare.png';
import priorityIcon from '/icons/priority.png';
import therapistIcon from '/icons/therapist.png';
import HomePageArticle from './HomePageArticle';
import ArticleRow from './ArticleRow';
import firstPatientLoginPhoto from '/images/patientConnexionPage_right.webp';
import secondPatientLoginPhoto from '/images/patientConnexionPage_left.webp';
import firstTherapistLoginPhoto from '/images/therapistConnexionPage_right.webp';
import secondTherapistLoginPhoto from '/images/therapistConnexionPage_left.webp';

interface DescriptionSectionProps {
  isHomePageDescriptionSection?: boolean;
  isPatientLoginPageDescriptionSection?: boolean;
  isTherapistLoginPageDescriptionSection?: boolean;
}

export default function DescriptionSection({
  isHomePageDescriptionSection,
  isPatientLoginPageDescriptionSection,
  isTherapistLoginPageDescriptionSection,
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
      ) : isPatientLoginPageDescriptionSection ||
        isTherapistLoginPageDescriptionSection ? (
        <div className="flex flex-col">
          <ArticleRow
            articleImage={
              isPatientLoginPageDescriptionSection
                ? firstPatientLoginPhoto
                : isTherapistLoginPageDescriptionSection
                  ? firstTherapistLoginPhoto
                  : ''
            }
            articleAlt={
              isPatientLoginPageDescriptionSection
                ? 'Homme faisant des exercices'
                : isTherapistLoginPageDescriptionSection
                  ? 'Kinésithérapeute faisant du massage plantaire'
                  : ''
            }
            articleParagraph={
              isPatientLoginPageDescriptionSection
                ? '"Nous sommes ravis de vous accueillir sur notre plateforme dédiée à la kinésithérapie. Ici, vous trouverez un espace conçu pour faciliter votre parcours de santé, vous permettant d’accéder à des soins de qualité et à des professionnels de santé qualifiés."'
                : isTherapistLoginPageDescriptionSection
                  ? "KineSoin est conçu pour les thérapeutes souhaitant élargir leur pratique et améliorer la communication avec leurs clients. Profitez d’une plateforme intuitive qui vous offre des ressources précieuses et un réseau de professionnels engagés. Ensemble, transformons des vies par le biais d'une thérapie bienveillante."
                  : ''
            }
            articleTitle={
              isPatientLoginPageDescriptionSection
                ? 'Bienvenue dans la communauté kineSoin !'
                : isTherapistLoginPageDescriptionSection
                  ? 'Bienvenue sur KineSoin'
                  : ''
            }
          />
          <ArticleRow
            articleImage={
              isPatientLoginPageDescriptionSection
                ? secondPatientLoginPhoto
                : isTherapistLoginPageDescriptionSection
                  ? secondTherapistLoginPhoto
                  : ''
            }
            articleAlt={
              isPatientLoginPageDescriptionSection
                ? "Homme faisant des exercices accompagnée d'une thérapeute"
                : isTherapistLoginPageDescriptionSection
                  ? 'Portrait Kinésithérapeute'
                  : ''
            }
            articleParagraph={
              isPatientLoginPageDescriptionSection
                ? 'Notre objectif est de vous accompagner à chaque étape de votre rétablissement. Profitez de notre interface conviviale pour prendre rendez-vous, échanger avec vos praticiens et suivre vos progrès. Ensemble, nous veillons à ce que votre expérience soit optimale et agréable.'
                : isTherapistLoginPageDescriptionSection
                  ? 'Grâce à KineSoin, découvrez des outils pour simplifier votre gestion de cabinet et enrichir vos interactions avec les clients. Notre plateforme facilite la prise de rendez-vous et le suivi des progrès, vous permettant de vous concentrer sur ce qui compte vraiment - le bien-être de vos patients. Rejoignez-nous pour créer un impact positif dans votre communauté.'
                  : ''
            }
            articleTitle={
              isPatientLoginPageDescriptionSection
                ? 'Votre bien-être, notre priorité'
                : isTherapistLoginPageDescriptionSection
                  ? 'Optimisez votre pratique'
                  : ''
            }
            isReversed
          />
        </div>
      ) : null}
    </div>
  );
}
