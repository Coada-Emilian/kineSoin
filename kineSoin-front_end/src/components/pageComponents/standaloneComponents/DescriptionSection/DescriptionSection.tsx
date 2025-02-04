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
import firstPatientRegisterFirstFormPhoto from '/images/patientRegisterFirstForm_right.webp';
import secondPatientRegisterFirstFormPhoto from '/images/patientRegisterFirstForm_left.webp';
import firstPatientRegisterSecondFormPhoto from '/images/patientRegisterSecondForm_right.webp';
import secondPatientRegisterSecondFormPhoto from '/images/patientRegisterSecondForm_left.webp';
import firstPatientRegisterThirdFormPhoto from '/images/patientRegisterThirdForm_right.webp';
import secondPatientRegisterThirdFormPhoto from '/images/patientRegisterThirdForm_left.webp';
import firstPatientConfirmationPhoto from '/images/patientRegisterConfirmPage_right.webp';
import secondPatientConfirmationPhoto from '/images/patientRegisterConfirmPage_left.webp';

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
      ) : (
        <div className="flex flex-col">
          <ArticleRow
            articleImage={
              isPatientLoginPageDescriptionSection
                ? firstPatientLoginPhoto
                : isTherapistLoginPageDescriptionSection
                  ? firstTherapistLoginPhoto
                  : isPatientRegisterFirstFormPageDescriptionSection
                    ? firstPatientRegisterFirstFormPhoto
                    : isPatientRegisterSecondFormPageDescriptionSection
                      ? firstPatientRegisterSecondFormPhoto
                      : isPatientRegisterThirdFormPageDescriptionSection
                        ? firstPatientRegisterThirdFormPhoto
                        : isPatientConfirmationPageDescriptionSection
                          ? firstPatientConfirmationPhoto
                          : ''
            }
            articleAlt={
              isPatientLoginPageDescriptionSection
                ? 'Homme faisant des exercices'
                : isTherapistLoginPageDescriptionSection
                  ? 'Kinésithérapeute faisant du massage plantaire'
                  : isPatientRegisterFirstFormPageDescriptionSection
                    ? 'Femme faisant des exercices accompagne'
                    : isPatientRegisterSecondFormPageDescriptionSection
                      ? "Homme faisant des exercices accompagnée d'une thérapeute"
                      : isPatientRegisterThirdFormPageDescriptionSection
                        ? 'Homme étant manipulé par un kiné'
                        : isPatientConfirmationPageDescriptionSection
                          ? 'Homme faisant des exercices avec une bande élastique'
                          : ''
            }
            articleParagraph={
              isPatientLoginPageDescriptionSection
                ? '"Nous sommes ravis de vous accueillir sur notre plateforme dédiée à la kinésithérapie. Ici, vous trouverez un espace conçu pour faciliter votre parcours de santé, vous permettant d’accéder à des soins de qualité et à des professionnels de santé qualifiés."'
                : isTherapistLoginPageDescriptionSection
                  ? "KineSoin est conçu pour les thérapeutes souhaitant élargir leur pratique et améliorer la communication avec leurs clients. Profitez d’une plateforme intuitive qui vous offre des ressources précieuses et un réseau de professionnels engagés. Ensemble, transformons des vies par le biais d'une thérapie bienveillante."
                  : isPatientRegisterFirstFormPageDescriptionSection
                    ? 'Découvrez un espace dédié à la kinésithérapie où vous pouvez accéder facilement à des soins de qualité. Nos professionnels sont à votre disposition pour vous accompagner dans votre rétablissement. Prenez rendez-vous, gérez vos séances et suivez vos progrès, tout en un seul endroit.'
                    : isPatientRegisterSecondFormPageDescriptionSection
                      ? 'Grâce à kineSoin, prenez rendez-vous avec nos kinés directement en ligne. Sélectionnez une date et une heure qui correspondent à votre emploi du temps et recevez une confirmation instantanée. Nous vous offrons des rappels automatiques pour vous assurer de ne jamais manquer vos séances de soins'
                      : isPatientRegisterThirdFormPageDescriptionSection
                        ? 'Avec kineSoin, accédez à votre tableau de bord personnalisé où vous pouvez suivre tous vos rendez-vous, vos échanges avec les praticiens, et vos dossiers médicaux. Gardez une trace de votre parcours de soins et retrouvez facilement toutes les informations importantes pour prendre soin de votre santé.'
                        : isPatientConfirmationPageDescriptionSection
                          ? 'Nous avons bien enregistré votre demande et elle est actuellement en cours de traitement. Merci de votre intérêt pour kineSoin. Nous vous informerons dès que votre compte sera approuvé.'
                          : ''
            }
            articleTitle={
              isPatientLoginPageDescriptionSection
                ? 'Bienvenue dans la communauté kineSoin !'
                : isTherapistLoginPageDescriptionSection
                  ? 'Bienvenue sur KineSoin'
                  : isPatientRegisterFirstFormPageDescriptionSection
                    ? 'Bienvenue sur kineSoin, votre partenaire santé au quotidien'
                    : isPatientRegisterSecondFormPageDescriptionSection
                      ? 'Réservez vos consultations en toute simplicité'
                      : isPatientRegisterThirdFormPageDescriptionSection
                        ? 'Votre espace santé, à portée de main'
                        : isPatientConfirmationPageDescriptionSection
                          ? 'Votre demande d’inscription a été reçue !'
                          : ''
            }
          />

          <ArticleRow
            isReversed
            articleImage={
              isPatientLoginPageDescriptionSection
                ? secondPatientLoginPhoto
                : isTherapistLoginPageDescriptionSection
                  ? secondTherapistLoginPhoto
                  : isPatientRegisterFirstFormPageDescriptionSection
                    ? secondPatientRegisterFirstFormPhoto
                    : isPatientRegisterSecondFormPageDescriptionSection
                      ? secondPatientRegisterSecondFormPhoto
                      : isPatientRegisterThirdFormPageDescriptionSection
                        ? secondPatientRegisterThirdFormPhoto
                        : isPatientConfirmationPageDescriptionSection
                          ? secondPatientConfirmationPhoto
                          : ''
            }
            articleAlt={
              isPatientLoginPageDescriptionSection
                ? "Homme faisant des exercices accompagnée d'une thérapeute"
                : isTherapistLoginPageDescriptionSection
                  ? 'Portrait Kinésithérapeute'
                  : isPatientRegisterFirstFormPageDescriptionSection
                    ? 'Équipement de kinésithérapie'
                    : isPatientRegisterSecondFormPageDescriptionSection
                      ? "Homme faisant des exercises sur une table d'examen"
                      : isPatientRegisterThirdFormPageDescriptionSection
                        ? "Femme agee faisant des extensions accompagnée d'un kinésithérapeute"
                        : isPatientConfirmationPageDescriptionSection
                          ? 'Femme étant manipule par un kiné'
                          : ''
            }
            articleParagraph={
              isPatientLoginPageDescriptionSection
                ? 'Notre objectif est de vous accompagner à chaque étape de votre rétablissement. Profitez de notre interface conviviale pour prendre rendez-vous, échanger avec vos praticiens et suivre vos progrès. Ensemble, nous veillons à ce que votre expérience soit optimale et agréable.'
                : isTherapistLoginPageDescriptionSection
                  ? 'Grâce à KineSoin, découvrez des outils pour simplifier votre gestion de cabinet et enrichir vos interactions avec les clients. Notre plateforme facilite la prise de rendez-vous et le suivi des progrès, vous permettant de vous concentrer sur ce qui compte vraiment - le bien-être de vos patients. Rejoignez-nous pour créer un impact positif dans votre communauté.'
                  : isPatientRegisterFirstFormPageDescriptionSection
                    ? 'kineSoin vous permet d’accéder à des consultations en ligne ou en présentiel avec des kinésithérapeutes qualifiés. Que vous soyez à la maison ou en déplacement, réservez vos rendez-vous en quelques clics et bénéficiez de soins personnalisés adaptés à vos besoins spécifiques, sans aucune contrainte.'
                    : isPatientRegisterSecondFormPageDescriptionSection
                      ? 'Choisissez entre des consultations en présentiel ou à distance selon vos préférences. Nous vous garantissons un service rapide, flexible et adapté à vos besoins. Gérer vos rendez-vous n’a jamais été aussi simple. En quelques clics, planifiez votre séance de rééducation avec un professionnel qualifié.'
                      : isPatientRegisterThirdFormPageDescriptionSection
                        ? 'Chez kineSoin, nous croyons en l’importance d’un suivi continu. Grâce à notre plateforme, vous pouvez suivre vos progrès, recevoir des conseils préventifs et rester en contact avec vos praticiens. Ensemble, nous vous aidons à atteindre vos objectifs de santé et à améliorer votre qualité de vie.'
                        : isPatientConfirmationPageDescriptionSection
                          ? 'Nous sommes ravis de vous accueillir dans notre communauté. Vous allez bientôt recevoir des nouvelles concernant votre inscription. Restez à l’écoute et préparez-vous à profiter de nos services !'
                          : ''
            }
            articleTitle={
              isPatientLoginPageDescriptionSection
                ? 'Votre bien-être, notre priorité'
                : isTherapistLoginPageDescriptionSection
                  ? 'Optimisez votre pratique'
                  : isPatientRegisterFirstFormPageDescriptionSection
                    ? 'Prenez soin de vous avec simplicité et efficacité'
                    : isPatientRegisterSecondFormPageDescriptionSection
                      ? 'Des soins accessibles quand vous en avez besoin'
                      : isPatientRegisterThirdFormPageDescriptionSection
                        ? 'Un suivi personnalisé pour un bien-être durable'
                        : isPatientConfirmationPageDescriptionSection
                          ? 'Bienvenue sur kineSoin !'
                          : ''
            }
          />
        </div>
      )}
    </div>
  );
}
