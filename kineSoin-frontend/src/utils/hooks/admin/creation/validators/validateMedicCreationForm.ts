export function validateMedicCreationForm(formData: FormData) {
  const name = String(formData.get('name')).trim();
  const surname = String(formData.get('surname')).trim();

  const streetNumber = String(formData.get('street_number')).trim();
  const streetName = String(formData.get('street_name')).trim();

  const postalCode = String(formData.get('postal_code')).trim();
  const city = String(formData.get('city')).trim();

  const prefix = String(formData.get('prefix')).trim();
  const phoneNumber = String(formData.get('phone_number'))
    .replace(/\s/g, '')
    .trim();

  const licenceCode = String(formData.get('licence_code')).trim();

  // Required fields
  if (
    !name ||
    !surname ||
    !streetName ||
    !postalCode ||
    !city ||
    !prefix ||
    !phoneNumber ||
    !licenceCode
  ) {
    throw new Error('Veuillez remplir tous les champs obligatoires.');
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

  // Licence ADELI
  if (!/^\d{9}$/.test(licenceCode)) {
    throw new Error('Le code licence doit être composé de 9 chiffres.');
  }

  // Address
  if (streetNumber && streetNumber.length > 10) {
    throw new Error('Le numéro de rue ne doit pas dépasser 10 caractères.');
  }

  if (streetName.length > 50) {
    throw new Error('Le nom de rue ne doit pas dépasser 50 caractères.');
  }

  if (!/^\d{5}$/.test(postalCode)) {
    throw new Error('Le code postal doit contenir 5 chiffres.');
  }

  if (city.length > 100) {
    throw new Error('La ville ne doit pas dépasser 100 caractères.');
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
      'Le numéro de téléphone doit contenir uniquement des chiffres.'
    );
  }

  return true;
}
