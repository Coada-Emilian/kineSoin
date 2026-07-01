import type { ValidateStepTwoFormFunctionProps } from '../../../../../@types/props/functionProps';

export const validateStepTwoForm = ({
  diploma,
  experience,
  specialty,
  description,
}: ValidateStepTwoFormFunctionProps): string | null => {
  const cleanDiploma = diploma.trim();
  const cleanExperience = experience.trim();
  const cleanSpecialty = specialty.trim();
  const cleanDescription = description.trim();

  // Required fields
  if (
    !cleanDiploma ||
    !cleanExperience ||
    !cleanSpecialty ||
    !cleanDescription
  ) {
    return 'Veuillez remplir tous les champs.';
  }

  // Minimum lengths
  if (cleanDiploma.length < 2) {
    return 'Le diplôme doit contenir au moins 2 caractères.';
  }

  if (cleanSpecialty.length < 2) {
    return 'La spécialité doit contenir au moins 2 caractères.';
  }

  if (cleanDescription.length < 10) {
    return 'La description doit contenir au moins 10 caractères.';
  }

  // Maximum lengths
  if (cleanDiploma.length > 100) {
    return 'Le diplôme ne doit pas dépasser 100 caractères.';
  }

  if (cleanExperience.length > 100) {
    return "L'expérience ne doit pas dépasser 100 caractères.";
  }

  if (cleanSpecialty.length > 100) {
    return 'La spécialité ne doit pas dépasser 100 caractères.';
  }

  if (cleanDescription.length > 500) {
    return 'La description ne doit pas dépasser 500 caractères.';
  }

  // Reject obvious garbage input
  const onlySpecialCharactersRegex = /^[^a-zA-ZÀ-ÿ0-9]+$/;

  if (onlySpecialCharactersRegex.test(cleanDiploma)) {
    return 'Le diplôme semble invalide.';
  }

  if (onlySpecialCharactersRegex.test(cleanSpecialty)) {
    return 'La spécialité semble invalide.';
  }

  return null;
};
