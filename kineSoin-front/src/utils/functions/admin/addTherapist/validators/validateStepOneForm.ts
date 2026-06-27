import type { ValidateStepOneFormFunctionProps } from '../../../../../@types/props/functionProps';

export const validateStepOneForm = ({
  name,
  surname,
  licence_code,
  file,
}: ValidateStepOneFormFunctionProps): string | null => {
  const cleanName = name.trim();
  const cleanSurname = surname.trim();
  const cleanLicenceCode = licence_code.trim();

  if (!cleanName || !cleanSurname || !cleanLicenceCode) {
    return 'Veuillez remplir tous les champs.';
  }

  const personNameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[-' ][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;

  if (!personNameRegex.test(cleanName)) {
    return 'Le nom ne doit contenir que des lettres, espaces, apostrophes ou tirets.';
  }

  if (!personNameRegex.test(cleanSurname)) {
    return 'Le prénom ne doit contenir que des lettres, espaces, apostrophes ou tirets.';
  }

  if (cleanName.length > 50) {
    return 'Le nom ne doit pas dépasser 50 caractères.';
  }

  if (cleanSurname.length > 50) {
    return 'Le prénom ne doit pas dépasser 50 caractères.';
  }

  if (!/^[0-9]{9}$/.test(cleanLicenceCode)) {
    return 'Le code ADELI doit être composé de 9 chiffres.';
  }

  if (!file) {
    return 'Veuillez ajouter une photo.';
  }

  const acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'];

  if (!acceptedTypes.includes(file.type)) {
    return 'La photo doit être au format JPG, PNG ou WEBP.';
  }

  const maxFileSize = 5 * 1024 * 1024;

  if (file.size > maxFileSize) {
    return 'La photo ne doit pas dépasser 5 Mo.';
  }

  return null;
};
