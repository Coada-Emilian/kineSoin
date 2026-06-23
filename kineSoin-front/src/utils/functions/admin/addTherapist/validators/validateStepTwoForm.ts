import type { ValidateStepTwoFormFunctionProps } from '../../../../../@types/props/functionProps';

export const validateStepTwoForm = ({
  diploma,
  experience,
  specialty,
  prefix,
  phone_number,
  description,
}: ValidateStepTwoFormFunctionProps): string | null => {
  if (
    !diploma ||
    !experience ||
    !specialty ||
    !description ||
    !prefix ||
    !phone_number
  ) {
    return 'Veuillez remplir tous les champs.';
  } else if (diploma.length > 100) {
    return 'Le diplôme ne doit pas dépasser 100 caractères.';
  } else if (experience.length > 100) {
    return "L'expérience ne doit pas dépasser 100 caractères.";
  } else if (specialty.length > 100) {
    return 'La spécialité ne doit pas dépasser 100 caractères.';
  } else if (description.length > 500) {
    return 'La description ne doit pas dépasser 500 caractères.';
  } else if (prefix.length > 10) {
    return 'Le préfixe ne doit pas dépasser 10 caractères.';
  } else if (phone_number.length > 15) {
    return 'Le numéro de téléphone ne doit pas dépasser 15 caractères.';
  } else if (!/^\d+$/.test(diploma)) {
    return 'Le numéro de téléphone ne doit contenir que des chiffres.';
  }

  return null;
};
