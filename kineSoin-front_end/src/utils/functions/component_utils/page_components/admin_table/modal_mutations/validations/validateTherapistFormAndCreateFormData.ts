import { IAddForm } from '../../../../../../../@types/interfaces/customInterfaces';

export function validateTherapistFormAndCreateFormData(addForm: IAddForm) {
  const name = addForm.name as string;
  const surname = addForm.surname as string;
  const email = addForm.email as string;
  const password = addForm.password as string;
  const repeatedPassword = addForm.repeated_password as string;
  const description = addForm.description as string;
  const diploma = addForm.diploma as string;
  const experience = addForm.experience as string;
  const specialty = addForm.specialty as string;
  const licenceCode = addForm.licence_code as string;
  const status = addForm.status as string;
  const photo = addForm.photo as Blob;
  const phoneNumber = addForm.phone_number as string;
  const prefix = addForm.prefix as string;

  const fullPhoneNumber = prefix + phoneNumber;
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
    !photo ||
    !fullPhoneNumber ||
    !phoneNumber ||
    !prefix
  ) {
    throw new Error('Veuillez remplir tous les champs.');
  } else if (name.length > 50) {
    throw new Error('Le nom ne doit pas dépasser 50 caractères.');
  } else if (surname.length > 50) {
    throw new Error('Le prénom ne doit pas dépasser 50 caractères.');
  } else if (diploma.length > 50) {
    throw new Error('Le diplôme ne doit pas dépasser 50 caractères.');
  } else if (experience.length > 50) {
    throw new Error("L'expérience ne doit pas dépasser 50 caractères.");
  } else if (specialty.length > 50) {
    throw new Error('La spécialité ne doit pas dépasser 50 caractères.');
  } else if (prefix.length > 10) {
    throw new Error('Le préfixe ne doit pas dépasser 10 caractères.');
  } else if (phoneNumber.length > 15) {
    throw new Error(
      'Le numéro de téléphone ne doit pas dépasser 15 caractères.'
    );
  } else if (fullPhoneNumber.length > 25) {
    throw new Error(
      'Le numéro de téléphone complet ne doit pas dépasser 25 caractères.'
    );
  } else if (email.length > 100) {
    throw new Error("L'email ne doit pas dépasser 100 caractères.");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("L'email doit être un email valide.");
  } else if (password.length < 8 || password.length > 20) {
    throw new Error('Le mot de passe doit contenir entre 8 et 20 caractères.');
  } else if (password !== repeatedPassword) {
    throw new Error('Les mots de passe ne correspondent pas.');
  } else if (licenceCode.length > 9) {
    throw new Error('Le code de licence ne doit pas dépasser 9 caractères.');
  } else if (!['active', 'inactive'].includes(status)) {
    throw new Error("Le statut doit être 'active' ou 'inactive'.");
  } else if (!(photo instanceof Blob)) {
    throw new Error('La photo doit être un fichier valide.');
  } else if (description.length > 500) {
    throw new Error('La description ne doit pas dépasser 500 caractères.');
  }

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
  newFormData.append('full_phone_number', fullPhoneNumber);
  newFormData.append('phone_number', phoneNumber);
  newFormData.append('prefix', prefix);

  return newFormData;
}
