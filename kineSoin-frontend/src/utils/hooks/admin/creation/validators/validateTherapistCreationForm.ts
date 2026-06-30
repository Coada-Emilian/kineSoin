import type { IAddTherapistFormData } from '../../../../../@types/interfaces/formInterfaces';

export function validateTherapistCreationForm(addForm: IAddTherapistFormData) {
  const name = String(addForm.name).trim();
  const surname = String(addForm.surname).trim();

  const email = String(addForm.email).trim();

  const password = String(addForm.password);
  const repeatedPassword = String(addForm.repeated_password);

  const description = String(addForm.description).trim();
  const diploma = String(addForm.diploma).trim();
  const experience = String(addForm.experience).trim();
  const specialty = String(addForm.specialty).trim();

  const licenceCode = String(addForm.licence_code).trim();

  const status = String(addForm.status).trim();

  const prefix = String(addForm.prefix).trim();
  const phoneNumber = String(addForm.phone_number).replace(/\s/g, '').trim();

  const photo = addForm.photo;

  // Required fields
  if (
    !name ||
    !surname ||
    !email ||
    !password ||
    !repeatedPassword ||
    !description ||
    !diploma ||
    !experience ||
    !specialty ||
    !licenceCode ||
    !status ||
    !prefix ||
    !phoneNumber ||
    !photo
  ) {
    throw new Error('Veuillez remplir tous les champs.');
  }

  // Names
  const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[-' ][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;

  if (!nameRegex.test(name)) {
    throw new Error('Le nom contient des caractères invalides.');
  }

  if (!nameRegex.test(surname)) {
    throw new Error('Le prénom contient des caractères invalides.');
  }

  if (name.length > 50) {
    throw new Error('Le nom ne doit pas dépasser 50 caractères.');
  }

  if (surname.length > 50) {
    throw new Error('Le prénom ne doit pas dépasser 50 caractères.');
  }

  // Email
  if (email.length > 255) {
    throw new Error("L'email ne doit pas dépasser 255 caractères.");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("L'email doit être valide.");
  }

  // Password
  if (password.length < 12) {
    throw new Error('Le mot de passe doit contenir au moins 12 caractères.');
  }

  if (!/[a-z]/.test(password)) {
    throw new Error('Le mot de passe doit contenir au moins une minuscule.');
  }

  if (!/[A-Z]/.test(password)) {
    throw new Error('Le mot de passe doit contenir au moins une majuscule.');
  }

  if (!/\d/.test(password)) {
    throw new Error('Le mot de passe doit contenir au moins un chiffre.');
  }

  if (!/[^a-zA-Z0-9]/.test(password)) {
    throw new Error('Le mot de passe doit contenir un caractère spécial.');
  }

  if (password !== repeatedPassword) {
    throw new Error('Les mots de passe ne correspondent pas.');
  }

  // Professional information
  if (diploma.length > 100) {
    throw new Error('Le diplôme ne doit pas dépasser 100 caractères.');
  }

  if (experience.length > 100) {
    throw new Error("L'expérience ne doit pas dépasser 100 caractères.");
  }

  if (specialty.length > 100) {
    throw new Error('La spécialité ne doit pas dépasser 100 caractères.');
  }

  if (description.length > 500) {
    throw new Error('La description ne doit pas dépasser 500 caractères.');
  }

  // ADELI
  if (!/^\d{9}$/.test(licenceCode)) {
    throw new Error('Le code ADELI doit être composé de 9 chiffres.');
  }

  // Status
  if (!['active', 'inactive'].includes(status)) {
    throw new Error("Le statut doit être 'active' ou 'inactive'.");
  }

  // Phone
  if (prefix.length > 10) {
    throw new Error('Le préfixe ne doit pas dépasser 10 caractères.');
  }

  if (!/^\+?\d+$/.test(prefix)) {
    throw new Error('Le préfixe téléphonique est invalide.');
  }

  if (phoneNumber.length < 7 || phoneNumber.length > 15) {
    throw new Error('Le numéro de téléphone est invalide.');
  }

  if (!/^\d+$/.test(phoneNumber)) {
    throw new Error(
      'Le numéro de téléphone ne doit contenir que des chiffres.'
    );
  }

  // File
  if (!(photo instanceof Blob)) {
    throw new Error('La photo doit être un fichier valide.');
  }

  const fullPhoneNumber = prefix + phoneNumber;

  const newFormData = new FormData();

  newFormData.append('name', name);
  newFormData.append('surname', surname);
  newFormData.append('email', email);
  newFormData.append('password', password);
  newFormData.append('repeated_password', repeatedPassword);

  newFormData.append('description', description);
  newFormData.append('diploma', diploma);
  newFormData.append('experience', experience);
  newFormData.append('specialty', specialty);

  newFormData.append('licence_code', licenceCode);
  newFormData.append('status', status);

  newFormData.append('photo', photo);

  newFormData.append('prefix', prefix);
  newFormData.append('phone_number', phoneNumber);
  newFormData.append('full_phone_number', fullPhoneNumber);

  return newFormData;
}
