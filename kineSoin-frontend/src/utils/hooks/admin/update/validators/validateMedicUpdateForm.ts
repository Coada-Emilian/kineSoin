export function validateMedicUpdateForm(id: number, formData: FormData) {
  if (!id || !formData) {
    throw new Error('ID et formulaire requis pour la mise à jour.');
  }

  const name = formData.get('name')?.toString().trim();
  const surname = formData.get('surname')?.toString().trim();
  const prefix = formData.get('prefix')?.toString().trim();
  const phone_number = formData.get('phone_number')?.toString().trim();
  const street_number = formData.get('street_number')?.toString().trim();
  const street_name = formData.get('street_name')?.toString().trim();
  const postal_code = formData.get('postal_code')?.toString().trim();
  const city = formData.get('city')?.toString().trim();
  const licence_code = formData.get('licence_code')?.toString().trim();

  // === Validations ===

  if (!name) {
    throw new Error('Le prénom est requis.');
  } else if (name.length > 50) {
    throw new Error('Le prénom ne doit pas dépasser 50 caractères.');
  }

  if (!surname) {
    throw new Error('Le nom est requis.');
  } else if (surname.length > 50) {
    throw new Error('Le nom ne doit pas dépasser 50 caractères.');
  }

  if (!prefix) {
    throw new Error('Le préfixe est requis.');
  } else if (!/^\+\d{1,5}$/.test(prefix)) {
    throw new Error(
      'Préfixe invalide. Il doit commencer par "+" suivi de chiffres.'
    );
  } else if (prefix.length > 10) {
    throw new Error('Le préfixe ne doit pas dépasser 10 caractères.');
  }

  if (!phone_number) {
    throw new Error('Le numéro de téléphone est requis.');
  } else if (!/^\d{6,15}$/.test(phone_number)) {
    throw new Error(
      'Le numéro de téléphone doit contenir entre 6 et 15 chiffres.'
    );
  }

  if (!street_number) {
    throw new Error('Le numéro de rue est requis.');
  } else if (!/^\d{1,5}$/.test(street_number)) {
    throw new Error('Le numéro de rue doit contenir entre 1 et 5 chiffres.');
  } else if (street_number.length > 10) {
    throw new Error('Le numéro de rue ne doit pas dépasser 10 caractères.');
  }

  if (!street_name) {
    throw new Error('Le nom de rue est requis.');
  } else if (street_name.length > 50) {
    throw new Error('Le nom de rue ne doit pas dépasser 50 caractères.');
  }

  if (!postal_code) {
    throw new Error('Le code postal est requis.');
  } else if (!/^\d{4,10}$/.test(postal_code)) {
    throw new Error('Le code postal doit contenir entre 4 et 10 chiffres.');
  }

  if (!city) {
    throw new Error('La ville est requise.');
  } else if (city.length > 100) {
    throw new Error('La ville ne doit pas dépasser 100 caractères.');
  }

  if (!licence_code) {
    throw new Error('Le code de licence est requis.');
  } else if (licence_code.length > 9) {
    throw new Error('Le code de licence ne doit pas dépasser 9 caractères.');
  }

  return true;
}
