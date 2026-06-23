export const validateThirdPatientRegistrationForm = (
  formData: FormData,
  patientImage: Blob | null
) => {
  const patientEmail = formData.get('email') as string;
  const patientPassword = formData.get('password') as string;
  const patientConfirmPassword = formData.get('confirm-password') as string;
  if (
    !patientImage ||
    !patientEmail ||
    !patientPassword ||
    !patientConfirmPassword
  ) {
    throw new Error('Veuillez remplir tous les champs');
  } else if (patientPassword !== patientConfirmPassword) {
    throw new Error('Les mots de passe ne correspondent pas');
  } else if (patientPassword.length < 12) {
    throw new Error('Le mot de passe doit contenir au moins 12 caractères');
  } else if (
    !/\d/.test(patientPassword) ||
    !/[a-z]/.test(patientPassword) ||
    !/[A-Z]/.test(patientPassword) ||
    !/[^a-zA-Z0-9]/.test(patientPassword)
  ) {
    throw new Error(
      'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial'
    );
  } else if (
    !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(patientEmail)
  ) {
    throw new Error('Veuillez entrer une adresse email valide');
  }
  return true;
};
