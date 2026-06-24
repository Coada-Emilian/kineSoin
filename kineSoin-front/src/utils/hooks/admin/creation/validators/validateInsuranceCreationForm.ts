export function validateInsuranceCreationForm(formData: FormData) {
  const name = String(formData.get('name')).trim();

  const amcCode = String(formData.get('amc_code')).trim();

  const streetNumber = String(formData.get('street_number')).trim();
  const streetName = String(formData.get('street_name')).trim();

  const postalCode = String(formData.get('postal_code')).trim();
  const city = String(formData.get('city')).trim();

  const prefix = String(formData.get('prefix')).trim();

  const telephone = String(formData.get('phone_number'))
    .replace(/\s/g, '')
    .trim();

  // Required fields
  if (
    !name ||
    !amcCode ||
    !streetName ||
    !postalCode ||
    !city ||
    !prefix ||
    !telephone
  ) {
    throw new Error('Veuillez remplir tous les champs.');
  }

  // Name
  if (name.length < 2) {
    throw new Error(
      "Le nom de l'organisme doit contenir au moins 2 caractères."
    );
  }

  if (name.length > 50) {
    throw new Error('Le nom ne doit pas dépasser 50 caractères.');
  }

  // AMC code
  if (amcCode.length > 9) {
    throw new Error('Le code AMC ne doit pas dépasser 9 caractères.');
  }

  if (!/^[0-9A-Za-z-]+$/.test(amcCode)) {
    throw new Error('Le code AMC contient des caractères invalides.');
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

  if (telephone.length < 7 || telephone.length > 15) {
    throw new Error('Le numéro de téléphone est invalide.');
  }

  if (!/^\d+$/.test(telephone)) {
    throw new Error(
      'Le numéro de téléphone doit contenir uniquement des chiffres.'
    );
  }

  return true;
}
