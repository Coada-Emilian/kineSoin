import { IErrorPageFunctionProps } from '../../../../@types/interfaces/customInterfaces';

export const getErrorPageLinkDestination = ({
  type,
}: IErrorPageFunctionProps) => {
  switch (type) {
    case 'connectedAdmin':
      return '/admin/therapists';
    case 'unconnectedAdmin':
      return '/loginAdmin';
    case 'public':
      return '/';
    case 'connectedPatient':
      return '/patient/dashboard';
    case 'unconnectedPatient':
      return '/loginPatient';
    case 'connectedTherapist':
      return '/therapist/dashboard';
    case 'unconnectedTherapist':
      return '/loginTherapist';
    default:
      return undefined;
  }
};

export const getErrorPageLinkText = ({ type }: IErrorPageFunctionProps) => {
  switch (type) {
    case 'connectedAdmin':
      return 'Retour au Tableau de Bord';
    case 'unconnectedAdmin':
      return 'Retour à la Page de Connexion';
    case 'public':
      return "Retour à l'Accueil";
    case 'connectedPatient':
      return 'Retour au Tableau de Bord';
    case 'unconnectedPatient':
      return 'Retour à la Page de Connexion';
    case 'connectedTherapist':
      return 'Retour au Tableau de Bord';
    case 'unconnectedTherapist':
      return 'Retour à la Page de Connexion';
    default:
      return '';
  }
};

export const getErrorPageErrorText = ({ type }: IErrorPageFunctionProps) => {
  switch (type) {
    case 'unconnectedAdmin':
    case 'unconnectedPatient':
    case 'unconnectedTherapist':
      return 'Accès refusé. Vous devez être connecté pour accéder à cette page.';
    default:
      return "Page Introuvable. La page que vous recherchez n'existe pas ou a été déplacée.";
  }
};

export const getErrorPageStatusCode = ({ type }: IErrorPageFunctionProps) => {
  switch (type) {
    case 'unconnectedAdmin':
    case 'unconnectedPatient':
    case 'unconnectedTherapist':
      return 403;
    default:
      return 404;
  }
};
