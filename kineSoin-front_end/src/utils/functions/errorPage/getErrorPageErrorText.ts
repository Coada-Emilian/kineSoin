import { IErrorPageFunctionProps } from '../../../@types/interfaces/customInterfaces';

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
