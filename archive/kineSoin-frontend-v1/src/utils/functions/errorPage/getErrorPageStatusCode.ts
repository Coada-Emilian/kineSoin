import { IErrorPageFunctionProps } from '../../../@types/interfaces/customInterfaces';

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
