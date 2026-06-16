export const validateFirstPatientRegistrationForm = (formData: FormData) => {
  if (!formData) {
    throw new Error('Form data is required');
  }
  const nameRegex = /^[A-Za-zÀ-ÿ\s'-]+$/;
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const patientName = formData.get('name') as string;
  const patientBirthName = formData.get('birth_name') as string;
  const patientSurname = formData.get('surname') as string;
  const patientBirthDate = formData.get('birth_date') as string;
  const patientGender = formData.get('gender') as string;

  // Check if the name, birth name and surname fields are empty
  if (
    !patientName ||
    !patientBirthName ||
    !patientSurname ||
    !patientBirthDate ||
    !patientGender
  ) {
    throw new Error('Veuillez remplir tous les champs');
  } else if (patientBirthDate > currentDate.toISOString().split('T')[0]) {
    throw new Error('Veuillez entrer une date valide');
  } else if (patientBirthDate < '1900-01-01') {
    throw new Error(
      'Veuillez entrer une date de naissance valide (après 1900)'
    );
  } else if (
    !nameRegex.test(patientName as string) ||
    !nameRegex.test(patientBirthName as string) ||
    !nameRegex.test(patientSurname as string)
  ) {
    throw new Error(
      'Le nom, le prénom et le nom de naissance ne doivent contenir que des lettres.'
    );
  }
  const age = currentYear - Number(patientBirthDate.split('-')[0]);
  if (age < 12) {
    throw new Error('Vous devez avoir au moins 12 ans pour vous inscrire');
  }

  return true;
};
