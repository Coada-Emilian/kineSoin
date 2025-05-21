import { IErrorPageFunctionProps } from '../../../@types/interfaces/customInterfaces';

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
