import { IDescriptionArticle } from '../../../../../@types/types/componentTypes';
import secondPatientConfirmationPhoto from '/images/patientRegisterConfirmPage_left.webp';
import firstPatientConfirmationPhoto from '/images/patientRegisterConfirmPage_right.webp';
import secondPatientRegisterFirstFormPhoto from '/images/patientRegisterFirstForm_left.webp';
import firstPatientRegisterFirstFormPhoto from '/images/patientRegisterFirstForm_right.webp';
import secondPatientRegisterSecondFormPhoto from '/images/patientRegisterSecondForm_left.webp';
import firstPatientRegisterSecondFormPhoto from '/images/patientRegisterSecondForm_right.webp';
import secondPatientRegisterThirdFormPhoto from '/images/patientRegisterThirdForm_left.webp';
import firstPatientRegisterThirdFormPhoto from '/images/patientRegisterThirdForm_right.webp';

export const registerFormArticles: IDescriptionArticle[] = [
  {
    formOrder: 'first',
    image: firstPatientRegisterFirstFormPhoto,
    alt: 'Femme faisant des exercices accompagnée',
    paragraph:
      'Découvrez un espace dédié à la kinésithérapie où vous pouvez accéder facilement à des soins de qualité. Nos professionnels sont à votre disposition pour vous accompagner dans votre rétablissement. Prenez rendez-vous, gérez vos séances et suivez vos progrès, tout en un seul endroit.',
    title: 'Bienvenue sur kineSoin, votre partenaire santé au quotidien',
  },
  {
    formOrder: 'second',
    image: firstPatientRegisterSecondFormPhoto,
    alt: "Homme faisant des exercices accompagnée d'une thérapeute",
    paragraph:
      'Grâce à kineSoin, prenez rendez-vous avec nos kinés directement en ligne. Sélectionnez une date et une heure qui correspondent à votre emploi du temps et recevez une confirmation instantanée. Nous vous offrons des rappels automatiques pour vous assurer de ne jamais manquer vos séances de soins',
    title: 'Réservez vos consultations en toute simplicité',
  },
  {
    formOrder: 'third',
    image: firstPatientRegisterThirdFormPhoto,
    alt: 'Homme étant manipulé par un kiné',
    paragraph:
      'Avec kineSoin, accédez à votre tableau de bord personnalisé où vous pouvez suivre tous vos rendez-vous, vos échanges avec les praticiens, et vos dossiers médicaux. Gardez une trace de votre parcours de soins et retrouvez facilement toutes les informations importantes pour prendre soin de votre santé.',
    title: 'Votre espace santé, à portée de main',
  },
  {
    formOrder: 'last',
    image: firstPatientConfirmationPhoto,
    alt: 'Homme faisant des exercices avec une bande élastique',
    paragraph:
      'Nous avons bien enregistré votre demande et elle est actuellement en cours de traitement. Merci de votre intérêt pour kineSoin. Nous vous informerons dès que votre compte sera approuvé.',
    title: 'Votre demande d’inscription a été reçue !',
  },
];

export const registerFormReverseArticles: IDescriptionArticle[] = [
  {
    formOrder: 'first',
    image: secondPatientRegisterFirstFormPhoto,
    alt: 'Équipement de kinésithérapie',
    paragraph:
      'kineSoin vous permet d’accéder à des consultations en ligne ou en présentiel avec des kinésithérapeutes qualifiés. Que vous soyez à la maison ou en déplacement, réservez vos rendez-vous en quelques clics et bénéficiez de soins personnalisés adaptés à vos besoins spécifiques, sans aucune contrainte.',

    title: 'Prenez soin de vous avec simplicité et efficacité',
  },
  {
    formOrder: 'second',
    image: secondPatientRegisterSecondFormPhoto,
    alt: "Homme faisant des exercises sur une table d'examen",
    paragraph:
      'Choisissez entre des consultations en présentiel ou à distance selon vos préférences. Nous vous garantissons un service rapide, flexible et adapté à vos besoins. Gérer vos rendez-vous n’a jamais été aussi simple. En quelques clics, planifiez votre séance de rééducation avec un professionnel qualifié.',
    title: 'Des soins accessibles quand vous en avez besoin',
  },
  {
    formOrder: 'third',
    image: secondPatientRegisterThirdFormPhoto,
    alt: "Femme agee faisant des extensions accompagnée d'un kinésithérapeute",
    paragraph:
      'Chez kineSoin, nous croyons en l’importance d’un suivi continu. Grâce à notre plateforme, vous pouvez suivre vos progrès, recevoir des conseils préventifs et rester en contact avec vos praticiens. Ensemble, nous vous aidons à atteindre vos objectifs de santé et à améliorer votre qualité de vie.',
    title: 'Un suivi personnalisé pour un bien-être durable',
  },
  {
    formOrder: 'last',
    image: secondPatientConfirmationPhoto,
    alt: 'Femme étant manipule par un kiné',
    paragraph:
      'Nous sommes ravis de vous accueillir dans notre communauté. Vous allez bientôt recevoir des nouvelles concernant votre inscription. Restez à l’écoute et préparez-vous à profiter de nos services !',
    title: 'Bienvenue sur kineSoin !',
  },
];
