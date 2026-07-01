import { IFormOrders } from '../../../../@types/types/componentTypes';

export const getSectionBackground = (formOrder: IFormOrders) => {
  switch (formOrder) {
    case 'first':
      return 'bg-patientFirstRegisterPage';
    case 'second':
      return 'bg-patientSecondRegisterPage';
    case 'third':
      return 'bg-patientThirdRegisterPage';
    default:
      return 'bg-confirmationPage';
  }
};
