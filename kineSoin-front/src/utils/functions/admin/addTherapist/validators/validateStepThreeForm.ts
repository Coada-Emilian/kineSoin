import type { ValidateStepThreeFormFunctionProps } from '../../../../../@types/props/functionProps';

export const validateStepThreeForm = ({
  email,
  password,
  repeated_password,
  status,
  prefix,
  phone_number,
}: ValidateStepThreeFormFunctionProps): string | null => {
  if (!email || !password || !repeated_password || !status) {
    return 'Veuillez remplir tous les champs.';
  } else if (password.length < 12) {
    return 'Le mot de passe doit contenir au moins 12 caractères.';
  } else if (!/(?=.*[a-z])/.test(password)) {
    return 'Le mot de passe doit contenir au moins une minuscule.';
  } else if (!/(?=.*[A-Z])/.test(password)) {
    return 'Le mot de passe doit contenir au moins une majuscule.';
  } else if (!/(?=.*\d)/.test(password)) {
    return 'Le mot de passe doit contenir au moins un chiffre.';
  } else if (!/(?=.*\W)/.test(password)) {
    return 'Le mot de passe doit contenir au moins un caractère spécial.';
  } else if (password !== repeated_password) {
    return 'Les mots de passe ne correspondent pas.';
  } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
    return "L'email n'est pas valide.";
  } else if (prefix.length > 10) {
    return 'Le préfixe ne doit pas dépasser 10 caractères.';
  } else if (phone_number.length > 15) {
    return 'Le numéro de téléphone ne doit pas dépasser 15 caractères.';
  } else if (!/^\d+$/.test(phone_number)) {
    return 'Le numéro de téléphone ne doit contenir que des chiffres.';
  }

  return null;
};
