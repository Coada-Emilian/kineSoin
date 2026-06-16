import { IFormOrders } from '../../../../@types/types/componentTypes';

export const getStepParagraph = (formOrder: IFormOrders) => {
  switch (formOrder) {
    case 'first':
      return 'Etape 1/3: Informations personnelles';
    case 'second':
      return 'Etape 2/3: Informations de connexion';
    case 'third':
      return 'Etape 3/3: Photo de profil';
    case 'last':
      return '';
  }
};
