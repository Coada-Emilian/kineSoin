/**
 * @function validateInsuranceForm
 *
 * Validates the insurance organism creation form data before submission.
 *
 * @param {FormData} formData - The form data containing insurance organism details.
 *
 * @throws {Error} Throws an error if any required field is missing or if any field violates length or format constraints.
 *
 * @returns {true} Returns true if all validations pass.
 *
 * @details
 * - Checks that all required fields are present and not empty.
 * - Validates maximum length for each field (name, licence code, street number, street name, postal code, city, prefix, telephone).
 * - Ensures the telephone number contains only digits and does not exceed 15 characters.
 */

export function validateInsuranceForm(formData: FormData) {
  const name = formData.get('name') as string;
  const licenceCode = formData.get('amc_code') as string;
  const streetNumber = formData.get('street_number') as string;
  const streetName = formData.get('street_name') as string;
  const postalCode = formData.get('postal_code') as string;
  const city = formData.get('city') as string;
  const prefix = formData.get('prefix') as string;
  const telephone = formData.get('phone_number') as string;

  if (
    !name ||
    !licenceCode ||
    !streetNumber ||
    !streetName ||
    !postalCode ||
    !city ||
    !prefix ||
    !telephone
  ) {
    throw new Error('Veuillez remplir tous les champs.');
  } else if (name.length > 50) {
    throw new Error('Le nom ne doit pas dépasser 50 caractères.');
  } else if (licenceCode.length > 9) {
    throw new Error("Le code d'assurance ne doit pas dépasser 9 caractères.");
  } else if (streetNumber.length > 10) {
    throw new Error('Le numéro de rue ne doit pas dépasser 10 caractères.');
  } else if (streetName.length > 50) {
    throw new Error('Le nom de rue ne doit pas dépasser 50 caractères.');
  } else if (postalCode.length > 9) {
    throw new Error('Le code postal ne doit pas dépasser 9 caractères.');
  } else if (city.length > 100) {
    throw new Error('La ville ne doit pas dépasser 100 caractères.');
  } else if (prefix.length > 10) {
    throw new Error('Le préfixe ne doit pas dépasser 10 caractères.');
  } else if (telephone.length > 15) {
    throw new Error(
      'Le numéro de téléphone ne doit pas dépasser 15 caractères.'
    );
  } else if (!/^\d+$/.test(telephone)) {
    throw new Error('Le numéro de téléphone doit être un nombre valide.');
  }

  return true;
}
