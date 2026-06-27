export const validateFirstPatientRegistrationForm = (formData: FormData) => {
  if (!formData) {
    throw new Error('Les données du formulaire sont obligatoires.');
  }

  const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[-' ][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;

  const patientName = String(formData.get('name')).trim();
  const patientBirthName = String(formData.get('birth_name')).trim();
  const patientSurname = String(formData.get('surname')).trim();

  const patientBirthDate = String(formData.get('birth_date')).trim();

  const patientGender = String(formData.get('gender')).trim();

  // Required fields
  if (
    !patientName ||
    !patientBirthName ||
    !patientSurname ||
    !patientBirthDate ||
    !patientGender
  ) {
    throw new Error('Veuillez remplir tous les champs.');
  }

  // Names validation
  if (
    !nameRegex.test(patientName) ||
    !nameRegex.test(patientBirthName) ||
    !nameRegex.test(patientSurname)
  ) {
    throw new Error(
      'Le nom, le prénom et le nom de naissance ne doivent contenir que des lettres, espaces, tirets ou apostrophes.'
    );
  }

  if (patientName.length > 50) {
    throw new Error('Le prénom ne doit pas dépasser 50 caractères.');
  }

  if (patientSurname.length > 50) {
    throw new Error('Le nom ne doit pas dépasser 50 caractères.');
  }

  if (patientBirthName.length > 50) {
    throw new Error('Le nom de naissance ne doit pas dépasser 50 caractères.');
  }

  // Birth date validation
  const birthDate = new Date(patientBirthDate);
  const today = new Date();

  if (Number.isNaN(birthDate.getTime())) {
    throw new Error('Veuillez entrer une date de naissance valide.');
  }

  const minimumDate = new Date('1900-01-01');

  if (birthDate < minimumDate) {
    throw new Error('La date de naissance doit être après 1900.');
  }

  if (birthDate > today) {
    throw new Error('La date de naissance ne peut pas être dans le futur.');
  }

  // Age validation
  let age = today.getFullYear() - birthDate.getFullYear();

  const hasBirthdayPassed =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate());

  if (!hasBirthdayPassed) {
    age--;
  }

  if (age < 12) {
    throw new Error('Vous devez avoir au moins 12 ans pour vous inscrire.');
  }

  // Gender validation
  if (!['male', 'female', 'other'].includes(patientGender)) {
    throw new Error('Le genre sélectionné est invalide.');
  }

  return true;
};
