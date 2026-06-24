export function validateMedicCreationForm(formData: FormData) {
  const name = formData.get('name') as string;
  const surname = formData.get('surname') as string;
  const street_number = formData.get('street_number') as string;
  const street_name = formData.get('street_name') as string;
  const postal_code = formData.get('postal_code') as string;
  const city = formData.get('city') as string;
  const prefix = formData.get('prefix') as string;
  const phone_number = formData.get('phone_number') as string;
  const licence_code = formData.get('licence_code') as string;

  // Required field check
  if (
    !name ||
    !surname ||
    !street_number ||
    !street_name ||
    !postal_code ||
    !city ||
    !prefix ||
    !phone_number ||
    !licence_code
  ) {
    throw new Error('Veuillez remplir tous les champs obligatoires.');
  }

  // Length checks
  if (name.length > 50) {
    throw new Error('Le prénom ne doit pas dépasser 50 caractères.');
  }

  if (surname.length > 50) {
    throw new Error('Le nom ne doit pas dépasser 50 caractères.');
  }

  if (street_number.length > 10) {
    throw new Error('Le numéro de rue ne doit pas dépasser 10 caractères.');
  }

  if (street_name.length > 50) {
    throw new Error('Le nom de rue ne doit pas dépasser 50 caractères.');
  }

  if (postal_code.length > 10) {
    throw new Error('Le code postal ne doit pas dépasser 10 caractères.');
  }

  if (city.length > 100) {
    throw new Error('La ville ne doit pas dépasser 100 caractères.');
  }

  if (prefix.length > 10) {
    throw new Error('Le préfixe ne doit pas dépasser 10 caractères.');
  }

  if (phone_number.length > 15) {
    throw new Error(
      'Le numéro de téléphone ne doit pas dépasser 15 caractères.'
    );
  }

  if (!/^\d+$/.test(phone_number)) {
    throw new Error(
      'Le numéro de téléphone doit contenir uniquement des chiffres.'
    );
  }

  if (licence_code.length > 9) {
    throw new Error('Le code licence ne doit pas dépasser 9 caractères.');
  }

  return true;
}
