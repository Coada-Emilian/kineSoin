import type { IErrorPageTypes } from '../../@types/types/customTypes';

interface ErrorPageConfig {
  link: string;
  linkText: string;
  status?: number;
  errorText?: string;
}

const accessDeniedText =
  'Accès refusé. Vous devez être connecté pour accéder à cette page.';

const dashboardText = 'Retour au Tableau de Bord';

const connectionText = 'Retour à la Page de Connexion';

const errorPageConfig: Record<IErrorPageTypes['type'], ErrorPageConfig> = {
  adminAuthenticated: {
    link: '/admin/therapists',
    linkText: dashboardText,
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
  },

  patientAuthenticated: {
    link: '/patient/dashboard',
    linkText: dashboardText,
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
  },

  therapistUnauthenticated: {
    link: '/loginTherapist',
    linkText: connectionText,
    status: 403,
    errorText: accessDeniedText,
  },
} satisfies Record<IErrorPageTypes['type'], ErrorPageConfig>;

export const getErrorPageStatusCode = ({ type }: IErrorPageTypes) => {
  return errorPageConfig[type].status ?? 404;
};

export const getErrorPageErrorText = ({ type }: IErrorPageTypes) => {
  return (
    errorPageConfig[type].errorText ??
    "Page Introuvable. La page que vous recherchez n'existe pas ou a été déplacée."
  );
};

export const getErrorPageLinkDestination = ({ type }: IErrorPageTypes) =>
  errorPageConfig[type].link;

export const getErrorPageLinkText = ({ type }: IErrorPageTypes) =>
  errorPageConfig[type].linkText;
