import type { ValidateStepThreeFormFunctionProps } from '../../../../../@types/props/functionProps';

export const validateStepThreeForm = ({
  email,
  password,
  repeated_password,
  status,
  prefix,
  phone_number,
}: ValidateStepThreeFormFunctionProps): string | null => {
  const cleanEmail = email.trim();
  const cleanPrefix = prefix.trim();
  const cleanPhone = phone_number.replace(/\s/g, '');

  // Required fields
  if (
    !cleanEmail ||
    !password ||
    !repeated_password ||
    !status ||
    !cleanPrefix ||
    !cleanPhone
  ) {
    return 'Veuillez remplir tous les champs.';
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(cleanEmail)) {
    return "L'email n'est pas valide.";
  }

  if (cleanEmail.length > 255) {
    return "L'email ne doit pas dépasser 255 caractères.";
  }

  // Password validation
  if (password.length < 12) {
    return 'Le mot de passe doit contenir au moins 12 caractères.';
  }

  if (password.length > 100) {
    return 'Le mot de passe ne doit pas dépasser 100 caractères.';
  }

  if (!/[a-z]/.test(password)) {
    return 'Le mot de passe doit contenir au moins une minuscule.';
  }

  if (!/[A-Z]/.test(password)) {
    return 'Le mot de passe doit contenir au moins une majuscule.';
  }

  if (!/\d/.test(password)) {
    return 'Le mot de passe doit contenir au moins un chiffre.';
  }

  if (!/[^a-zA-Z0-9]/.test(password)) {
    return 'Le mot de passe doit contenir au moins un caractère spécial.';
  }

  if (password !== repeated_password) {
    return 'Les mots de passe ne correspondent pas.';
  }

  // Prefix validation
  if (cleanPrefix.length > 10) {
    return 'Le préfixe ne doit pas dépasser 10 caractères.';
  }

  if (!/^\+?\d+$/.test(cleanPrefix)) {
    return 'Le préfixe téléphonique est invalide.';
  }

  // Phone validation
  if (cleanPhone.length < 7) {
    return 'Le numéro de téléphone est trop court.';
  }

  if (cleanPhone.length > 15) {
    return 'Le numéro de téléphone ne doit pas dépasser 15 caractères.';
  }

  if (!/^\d+$/.test(cleanPhone)) {
    return 'Le numéro de téléphone ne doit contenir que des chiffres.';
  }

  return null;
};
