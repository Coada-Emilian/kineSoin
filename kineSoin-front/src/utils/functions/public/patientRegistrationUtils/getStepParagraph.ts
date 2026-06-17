import type { IFormOrders } from '../../../../@types/interfaces/customTypes';

export const getStepParagraph = (formOrder: IFormOrders) => {
  switch (formOrder) {
    case 'first':
      return 'Étape 1/3 : Informations personnelles';
    case 'second':
      return 'Étape 2/3 : Coordonnées';
    case 'third':
      return 'Étape 3/3 : Création du compte';
    case 'last':
      return '';
  }
};
