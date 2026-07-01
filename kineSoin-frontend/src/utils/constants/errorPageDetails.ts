import type { IErrorPageDetails } from '../../@types/interfaces/componentInterfaces';
import type { IErrorPageTypes } from '../../@types/types/customTypes';

const accessDeniedText =
  'Accès refusé. Vous devez être connecté pour accéder à cette page.';

const notFoundText =
  "Page introuvable. La page que vous recherchez n'existe pas ou a été déplacée.";

const dashboardText = 'Retour au Tableau de Bord';

const connectionText = 'Retour à la Page de Connexion';

const errorPageConfig: Record<IErrorPageTypes['type'], IErrorPageDetails> = {
  adminAuthenticated: {
    link: '/admin/therapists',
    linkText: dashboardText,
    status: 404,
    errorText: notFoundText,
  },

  adminUnauthenticated: {
    link: '/loginAdmin',
    linkText: connectionText,
    status: 403,
    errorText: accessDeniedText,
  },

  public: {
    link: '/',
    linkText: "Retour à l'Accueil",
    status: 404,
    errorText: notFoundText,
  },

  patientAuthenticated: {
    link: '/patient/dashboard',
    linkText: dashboardText,
    status: 404,
    errorText: notFoundText,
  },

  patientUnauthenticated: {
    link: '/loginPatient',
    linkText: connectionText,
    status: 403,
    errorText: accessDeniedText,
  },

  therapistAuthenticated: {
    link: '/therapist/dashboard',
    linkText: dashboardText,
    status: 404,
    errorText: notFoundText,
  },

  therapistUnauthenticated: {
    link: '/loginTherapist',
    linkText: connectionText,
    status: 403,
    errorText: accessDeniedText,
  },
};

export const getErrorPageStatusCode = ({ type }: IErrorPageTypes) => {
  return errorPageConfig[type].status;
};

export const getErrorPageErrorText = ({ type }: IErrorPageTypes) => {
  return errorPageConfig[type].errorText;
};

export const getErrorPageLinkDestination = ({ type }: IErrorPageTypes) =>
  errorPageConfig[type].link;

export const getErrorPageLinkText = ({ type }: IErrorPageTypes) =>
  errorPageConfig[type].linkText;
