import type { ValidateStepOneFormFunctionProps } from '../../../../../@types/props/functionProps';

export const validateStepOneForm = ({
  name,
  surname,
  licence_code,
  file,
}: ValidateStepOneFormFunctionProps): string | null => {
  if (!name || !surname || !licence_code) {
    return 'Veuillez remplir tous les champs.';
  }

  if (!file) {
    return 'Veuillez ajouter une photo.';
  }

  if (!/^[0-9]{9}$/.test(licence_code)) {
    return 'Le code ADELI doit être composé de 9 chiffres.';
  }

  if (!/^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)*$/.test(name)) {
    return 'Le nom ne doit contenir que des lettres et des espaces.';
  }

  if (!/^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)*$/.test(surname)) {
    return 'Le prénom ne doit contenir que des lettres et des espaces.';
  }

  return null;
};
