import type { IPatientRegistrationFormData } from '../../../../@types/interfaces/formInterfaces';

export function validateFinalPatientRegistrationForm(
  patientForm: IPatientRegistrationFormData
) {
  const name = patientForm.name as string;
  const birthName = patientForm.birth_name as string;
  const surname = patientForm.surname as string;
  const gender = patientForm.gender as string;
  const birthDate = patientForm.birth_date as string;

  const streetNumber = patientForm.street_number as string;
  const streetName = patientForm.street_name as string;
  const postalCode = patientForm.postal_code as string;
  const city = patientForm.city as string;

  const prefix = patientForm.prefix as string;
  const phoneNumber = patientForm.phone_number as string;

  const email = patientForm.email as string;
  const password = patientForm.password as string;

  const picture = patientForm.picture as File;

  const fullPhoneNumber = prefix + phoneNumber;

  const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;

  if (
    !name ||
    !birthName ||
    !surname ||
    !gender ||
    !birthDate ||
    !streetNumber ||
    !streetName ||
    !postalCode ||
    !city ||
    !prefix ||
    !phoneNumber ||
    !email ||
    !password ||
    !picture
  ) {
    throw new Error('Veuillez remplir tous les champs.');
  }

  // Identity
  if (name.length > 50) {
    throw new Error('Le nom ne doit pas dépasser 50 caractères.');
  }

  if (birthName.length > 50) {
    throw new Error('Le nom de naissance ne doit pas dépasser 50 caractères.');
  }

  if (surname.length > 50) {
    throw new Error('Le prénom ne doit pas dépasser 50 caractères.');
  }

  if (
    !nameRegex.test(name) ||
    !nameRegex.test(birthName) ||
    !nameRegex.test(surname)
  ) {
    throw new Error('Les noms et prénoms ne doivent contenir que des lettres.');
  }

  // Birth date
  const today = new Date();
  const minimumDate = new Date('1900-01-01');
  const selectedDate = new Date(birthDate);

  if (selectedDate > today || selectedDate < minimumDate) {
    throw new Error('Veuillez entrer une date de naissance valide.');
  }

  // Address
  if (streetNumber.length > 10) {
    throw new Error('Le numéro de rue ne doit pas dépasser 10 caractères.');
  }

  if (streetName.length > 100) {
    throw new Error('Le nom de rue ne doit pas dépasser 100 caractères.');
  }

  if (city.length > 100) {
    throw new Error('La ville ne doit pas dépasser 100 caractères.');
  }

  if (!nameRegex.test(city)) {
    throw new Error('La ville contient des caractères invalides.');
  }

  if (!/^\d{5}$/.test(postalCode)) {
    throw new Error('Le code postal doit contenir 5 chiffres.');
  }

  // Phone
  if (prefix.length > 10) {
    throw new Error('Le préfixe ne doit pas dépasser 10 caractères.');
  }

  if (!/^\d+$/.test(phoneNumber)) {
    throw new Error(
      'Le numéro de téléphone doit contenir uniquement des chiffres.'
    );
  }

  if (phoneNumber.length > 15) {
    throw new Error('Le numéro de téléphone ne doit pas dépasser 15 chiffres.');
  }

  if (fullPhoneNumber.length > 25) {
    throw new Error(
      'Le numéro de téléphone complet ne doit pas dépasser 25 caractères.'
    );
  }

  // Account
  if (email.length > 100) {
    throw new Error("L'email ne doit pas dépasser 100 caractères.");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("L'email doit être valide.");
  }

  if (password.length < 12 || password.length > 100) {
    throw new Error(
      'Le mot de passe doit contenir entre 12 et 100 caractères.'
    );
  }

  if (
    !/(?=.*[a-z])/.test(password) ||
    !/(?=.*[A-Z])/.test(password) ||
    !/(?=.*\d)/.test(password) ||
    !/(?=.*\W)/.test(password)
  ) {
    throw new Error(
      'Le mot de passe doit contenir une majuscule, une minuscule, un chiffre et un caractère spécial.'
    );
  }

  // Image
  if (!(picture instanceof File)) {
    throw new Error('La photo doit être un fichier valide.');
  }

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

  if (!allowedTypes.includes(picture.type)) {
    throw new Error('La photo doit être au format JPG, PNG ou WEBP.');
  }

  if (picture.size > 5 * 1024 * 1024) {
    throw new Error('La photo ne doit pas dépasser 5 Mo.');
  }

  const newFormData = new FormData();

  newFormData.append('name', name);
  newFormData.append('birth_name', birthName);
  newFormData.append('surname', surname);
  newFormData.append('gender', gender);
  newFormData.append('birth_date', birthDate);

  newFormData.append('street_number', streetNumber);
  newFormData.append('street_name', streetName);
  newFormData.append('postal_code', postalCode);
  newFormData.append('city', city);

  newFormData.append('prefix', prefix);
  newFormData.append('phone_number', phoneNumber);
  newFormData.append('full_phone_number', fullPhoneNumber);

  newFormData.append('email', email);
  newFormData.append('password', password);

  newFormData.append('picture', picture);

  return newFormData;
}
