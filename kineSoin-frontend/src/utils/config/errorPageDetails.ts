import type { IErrorPageDetails } from '../../@types/interfaces/componentInterfaces';
import type { ErrorPageProps } from '../../@types/props/componentProps';
import type { ErrorPageType } from '../../@types/types/errorTypes';

const accessDeniedText =
  'Accès refusé. Vous devez être connecté pour accéder à cette page.';

const notFoundText =
  "Page introuvable. La page que vous recherchez n'existe pas ou a été déplacée.";

const dashboardText = 'Retour au Tableau de Bord';

const connectionText = 'Retour à la Page de Connexion';

const errorPageConfig: Record<ErrorPageProps['type'], IErrorPageDetails> = {
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

export const getErrorPageStatusCode = (type: ErrorPageType) => {
  return errorPageConfig[type].status;
};

export const getErrorPageErrorText = (type: ErrorPageType) => {
  return errorPageConfig[type].errorText;
};

export const getErrorPageLinkDestination = (type: ErrorPageType) =>
  errorPageConfig[type].link;

export const getErrorPageLinkText = (type: ErrorPageType) =>
  errorPageConfig[type].linkText;
