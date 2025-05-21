import { IErrorPageFunctionProps } from '../../../@types/interfaces/customInterfaces';

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
