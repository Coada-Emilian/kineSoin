export const validateSecondPatientRegistrationForm = (formData: FormData) => {
  const postalCode = String(formData.get('postal_code')).trim();
  const city = String(formData.get('city')).trim();

  const streetNumber = String(formData.get('street_number')).trim();
  const streetName = String(formData.get('street_name')).trim();

  const phoneNumber = String(formData.get('phone_number'))
    .replace(/\s/g, '')
    .trim();

  const prefix = String(formData.get('prefix')).trim();

  // Required fields
  if (
    !postalCode ||
    !city ||
    !streetNumber ||
    !streetName ||
    !phoneNumber ||
    !prefix
  ) {
    throw new Error('Veuillez remplir tous les champs.');
  }

  // Postal code
  if (!/^\d{5}$/.test(postalCode)) {
    throw new Error('Veuillez entrer un code postal valide (5 chiffres).');
  }

  // City
  if (!/^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[-' ][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/.test(city)) {
    throw new Error('Veuillez entrer un nom de ville valide.');
  }

  if (city.length > 100) {
    throw new Error('Le nom de la ville ne doit pas dépasser 100 caractères.');
  }

  // Street number
  if (!/^\d+[A-Za-z]?$/.test(streetNumber)) {
    throw new Error('Veuillez entrer un numéro de rue valide.');
  }

  if (streetNumber.length > 10) {
    throw new Error('Le numéro de rue ne doit pas dépasser 10 caractères.');
  }

  // Street name
  if (!/^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[-' ][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/.test(streetName)) {
    throw new Error('Veuillez entrer un nom de rue valide.');
  }

  if (streetName.length > 100) {
    throw new Error('Le nom de rue ne doit pas dépasser 100 caractères.');
  }

  // Phone prefix
  if (!/^\+?\d+$/.test(prefix)) {
    throw new Error('Le préfixe téléphonique est invalide.');
  }

  if (prefix.length > 10) {
    throw new Error(
      'Le préfixe téléphonique ne doit pas dépasser 10 caractères.'
    );
  }

  // Phone number
  if (phoneNumber.length < 7 || phoneNumber.length > 15) {
    throw new Error(
      'Le numéro de téléphone doit contenir entre 7 et 15 chiffres.'
    );
  }

  if (!/^\d+$/.test(phoneNumber)) {
    throw new Error(
      'Le numéro de téléphone doit contenir uniquement des chiffres.'
    );
  }

  return true;
};
