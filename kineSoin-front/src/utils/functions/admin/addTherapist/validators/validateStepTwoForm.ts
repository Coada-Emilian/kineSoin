import type { ValidateStepTwoFormFunctionProps } from '../../../../../@types/props/functionProps';

export const validateStepTwoForm = ({
  diploma,
  experience,
  specialty,

  description,
}: ValidateStepTwoFormFunctionProps): string | null => {
  if (!diploma || !experience || !specialty || !description) {
    return 'Veuillez remplir tous les champs.';
  } else if (diploma.length > 100) {
    return 'Le diplôme ne doit pas dépasser 100 caractères.';
  } else if (experience.length > 100) {
    return "L'expérience ne doit pas dépasser 100 caractères.";
  } else if (specialty.length > 100) {
    return 'La spécialité ne doit pas dépasser 100 caractères.';
  } else if (description.length > 500) {
    return 'La description ne doit pas dépasser 500 caractères.';
  }

  return null;
};
