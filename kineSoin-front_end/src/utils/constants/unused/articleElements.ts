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

interface ArticleElementsProps {
  isPatientLoginPageDescriptionSection?: boolean;
  isTherapistLoginPageDescriptionSection?: boolean;
  isPatientRegisterFirstFormPageDescriptionSection?: boolean;
  isPatientRegisterSecondFormPageDescriptionSection?: boolean;
  isPatientRegisterThirdFormPageDescriptionSection?: boolean;
  isPatientConfirmationPageDescriptionSection?: boolean;
}

export const articleElements = ({
  isPatientLoginPageDescriptionSection,
  isTherapistLoginPageDescriptionSection,
  isPatientRegisterFirstFormPageDescriptionSection,
  isPatientRegisterSecondFormPageDescriptionSection,
  isPatientRegisterThirdFormPageDescriptionSection,
  isPatientConfirmationPageDescriptionSection,
}: ArticleElementsProps) => {
  return {
    articles: {
      articleImage: isPatientRegisterFirstFormPageDescriptionSection
        ? firstPatientRegisterFirstFormPhoto
        : isPatientRegisterSecondFormPageDescriptionSection
          ? firstPatientRegisterSecondFormPhoto
          : isPatientRegisterThirdFormPageDescriptionSection
            ? firstPatientRegisterThirdFormPhoto
            : isPatientConfirmationPageDescriptionSection
              ? firstPatientConfirmationPhoto
              : '', // Default case if no condition matches

      articleAlt: isPatientRegisterFirstFormPageDescriptionSection
        ? 'Femme faisant des exercices accompagnée'
        : isPatientRegisterSecondFormPageDescriptionSection
          ? "Homme faisant des exercices accompagnée d'une thérapeute"
          : isPatientRegisterThirdFormPageDescriptionSection
            ? 'Homme étant manipulé par un kiné'
            : isPatientConfirmationPageDescriptionSection
              ? 'Homme faisant des exercices avec une bande élastique'
              : '',

      articleParagraph: isPatientRegisterFirstFormPageDescriptionSection
        ? 'Découvrez un espace dédié à la kinésithérapie où vous pouvez accéder facilement à des soins de qualité. Nos professionnels sont à votre disposition pour vous accompagner dans votre rétablissement. Prenez rendez-vous, gérez vos séances et suivez vos progrès, tout en un seul endroit.'
        : isPatientRegisterSecondFormPageDescriptionSection
          ? 'Grâce à kineSoin, prenez rendez-vous avec nos kinés directement en ligne. Sélectionnez une date et une heure qui correspondent à votre emploi du temps et recevez une confirmation instantanée. Nous vous offrons des rappels automatiques pour vous assurer de ne jamais manquer vos séances de soins'
          : isPatientRegisterThirdFormPageDescriptionSection
            ? 'Avec kineSoin, accédez à votre tableau de bord personnalisé où vous pouvez suivre tous vos rendez-vous, vos échanges avec les praticiens, et vos dossiers médicaux. Gardez une trace de votre parcours de soins et retrouvez facilement toutes les informations importantes pour prendre soin de votre santé.'
            : isPatientConfirmationPageDescriptionSection
              ? 'Nous avons bien enregistré votre demande et elle est actuellement en cours de traitement. Merci de votre intérêt pour kineSoin. Nous vous informerons dès que votre compte sera approuvé.'
              : '',

      articleTitle: isPatientRegisterFirstFormPageDescriptionSection
        ? 'Bienvenue sur kineSoin, votre partenaire santé au quotidien'
        : isPatientRegisterSecondFormPageDescriptionSection
          ? 'Réservez vos consultations en toute simplicité'
          : isPatientRegisterThirdFormPageDescriptionSection
            ? 'Votre espace santé, à portée de main'
            : isPatientConfirmationPageDescriptionSection
              ? 'Votre demande d’inscription a été reçue !'
              : '',
    },
    reverseArticles: {
      reverseArticleImage: isTherapistLoginPageDescriptionSection
        ? secondTherapistLoginPhoto
        : isPatientRegisterFirstFormPageDescriptionSection
          ? secondPatientRegisterFirstFormPhoto
          : isPatientRegisterSecondFormPageDescriptionSection
            ? secondPatientRegisterSecondFormPhoto
            : isPatientRegisterThirdFormPageDescriptionSection
              ? secondPatientRegisterThirdFormPhoto
              : isPatientConfirmationPageDescriptionSection
                ? secondPatientConfirmationPhoto
                : '',

      reverseArticleAlt: isPatientRegisterFirstFormPageDescriptionSection
        ? 'Équipement de kinésithérapie'
        : isPatientRegisterSecondFormPageDescriptionSection
          ? "Homme faisant des exercises sur une table d'examen"
          : isPatientRegisterThirdFormPageDescriptionSection
            ? "Femme agee faisant des extensions accompagnée d'un kinésithérapeute"
            : isPatientConfirmationPageDescriptionSection
              ? 'Femme étant manipule par un kiné'
              : '',

      reverseArticleParagraph: isPatientRegisterFirstFormPageDescriptionSection
        ? 'kineSoin vous permet d’accéder à des consultations en ligne ou en présentiel avec des kinésithérapeutes qualifiés. Que vous soyez à la maison ou en déplacement, réservez vos rendez-vous en quelques clics et bénéficiez de soins personnalisés adaptés à vos besoins spécifiques, sans aucune contrainte.'
        : isPatientRegisterSecondFormPageDescriptionSection
          ? 'Choisissez entre des consultations en présentiel ou à distance selon vos préférences. Nous vous garantissons un service rapide, flexible et adapté à vos besoins. Gérer vos rendez-vous n’a jamais été aussi simple. En quelques clics, planifiez votre séance de rééducation avec un professionnel qualifié.'
          : isPatientRegisterThirdFormPageDescriptionSection
            ? 'Chez kineSoin, nous croyons en l’importance d’un suivi continu. Grâce à notre plateforme, vous pouvez suivre vos progrès, recevoir des conseils préventifs et rester en contact avec vos praticiens. Ensemble, nous vous aidons à atteindre vos objectifs de santé et à améliorer votre qualité de vie.'
            : isPatientConfirmationPageDescriptionSection
              ? 'Nous sommes ravis de vous accueillir dans notre communauté. Vous allez bientôt recevoir des nouvelles concernant votre inscription. Restez à l’écoute et préparez-vous à profiter de nos services !'
              : '',

      reverseArticleTitle: isPatientRegisterFirstFormPageDescriptionSection
        ? 'Prenez soin de vous avec simplicité et efficacité'
        : isPatientRegisterSecondFormPageDescriptionSection
          ? 'Des soins accessibles quand vous en avez besoin'
          : isPatientRegisterThirdFormPageDescriptionSection
            ? 'Un suivi personnalisé pour un bien-être durable'
            : isPatientConfirmationPageDescriptionSection
              ? 'Bienvenue sur kineSoin !'
              : '',
    },
  };
};
