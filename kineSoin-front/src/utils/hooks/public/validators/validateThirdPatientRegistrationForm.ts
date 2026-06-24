export const validateThirdPatientRegistrationForm = (
  formData: FormData,
  patientImage: Blob | null
) => {
  const patientEmail = String(formData.get('email')).trim();

  const patientPassword = String(formData.get('password')).trim();

  const patientConfirmPassword = String(
    formData.get('confirm-password')
  ).trim();

  // Required fields
  if (
    !patientImage ||
    !patientEmail ||
    !patientPassword ||
    !patientConfirmPassword
  ) {
    throw new Error('Veuillez remplir tous les champs.');
  }

  // Email validation
  if (patientEmail.length > 100) {
    throw new Error("L'email ne doit pas dépasser 100 caractères.");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(patientEmail)) {
    throw new Error('Veuillez entrer une adresse email valide.');
  }

  // Password validation
  if (patientPassword.length < 12) {
    throw new Error('Le mot de passe doit contenir au moins 12 caractères.');
  }

  if (patientPassword.length > 100) {
    throw new Error('Le mot de passe ne doit pas dépasser 100 caractères.');
  }

  if (!/[a-z]/.test(patientPassword)) {
    throw new Error(
      'Le mot de passe doit contenir au moins une lettre minuscule.'
    );
  }

  if (!/[A-Z]/.test(patientPassword)) {
    throw new Error(
      'Le mot de passe doit contenir au moins une lettre majuscule.'
    );
  }

  if (!/\d/.test(patientPassword)) {
    throw new Error('Le mot de passe doit contenir au moins un chiffre.');
  }

  if (!/[^a-zA-Z0-9]/.test(patientPassword)) {
    throw new Error(
      'Le mot de passe doit contenir au moins un caractère spécial.'
    );
  }

  if (patientPassword !== patientConfirmPassword) {
    throw new Error('Les mots de passe ne correspondent pas.');
  }

  // Image validation
  if (!(patientImage instanceof Blob)) {
    throw new Error('La photo doit être un fichier valide.');
  }

  if (patientImage.size > 5 * 1024 * 1024) {
    throw new Error('La photo ne doit pas dépasser 5 Mo.');
  }

  return true;
};
