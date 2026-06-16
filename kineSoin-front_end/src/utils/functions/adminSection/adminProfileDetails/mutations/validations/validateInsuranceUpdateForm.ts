/**
 * @function validateInsuranceUpdateForm
 *
 * Validates the update form data for an insurance organism's profile.
 *
 * @param {number} id - The ID of the insurance organism being updated.
 * @param {FormData} formData - The form data containing updated insurance details.
 *
 * @returns {boolean} Returns `true` if validation passes.
 *
 * @throws {Error} Throws an error with a descriptive message if validation fails.
 *
 * @details
 * - Ensures the presence of the ID and required fields in the form.
 * - Validates the following fields:
 *   - `name`: required, max 255 characters.
 *   - `prefix`: required, must start with `+` followed by 1 to 5 digits, max 10 characters.
 *   - `phone_number`: required, 6–15 digits.
 *   - `street_number`: required, 1–5 digits, max 10 characters.
 *   - `street_name`: required, max 50 characters.
 *   - `postal_code`: required, 4–10 digits.
 *   - `city`: required, max 100 characters.
 *   - `amc_code`: required, max 9 characters.
 *
 * @example
 * const formData = new FormData();
 * formData.append('name', 'Assurance ABC');
 * formData.append('prefix', '+33');
 * // ... add all required fields
 * validateInsuranceUpdateForm(1, formData); // returns true or throws error
 */

export function validateInsuranceUpdateForm(id: number, formData: FormData) {
  if (!id || !formData) {
    throw new Error('ID et formulaire requis pour la mise à jour.');
  }

  const name = formData.get('name')?.toString().trim();
  const prefix = formData.get('prefix')?.toString().trim();
  const phone_number = formData.get('phone_number')?.toString().trim();
  const street_number = formData.get('street_number')?.toString().trim();
  const street_name = formData.get('street_name')?.toString().trim();
  const postal_code = formData.get('postal_code')?.toString().trim();
  const city = formData.get('city')?.toString().trim();
  const amc_code = formData.get('amc_code')?.toString().trim();

  // === Validation ===

  if (!name) {
    throw new Error('Le nom est requis.');
  } else if (name.length > 255) {
    throw new Error('Le nom ne doit pas dépasser 255 caractères.');
  }

  if (!prefix) {
    throw new Error('Le préfixe est requis.');
  } else if (!/^\+\d{1,5}$/.test(prefix)) {
    throw new Error(
      'Préfixe invalide. Il doit commencer par "+" suivi de 1 à 5 chiffres.'
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

  if (!amc_code) {
    throw new Error('Le code AMC est requis.');
  } else if (amc_code.length > 9) {
    throw new Error('Le code AMC ne doit pas dépasser 9 caractères.');
  }

  return true;
}
