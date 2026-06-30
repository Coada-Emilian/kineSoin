/**
 * @function validateAfflictionUpdateForm
 *
 * Validates the update form data for an affliction's profile.
 *
 * @param {number} id - The ID of the affliction being updated.
 * @param {FormData} formData - The form data containing updated affliction details.
 *
 * @returns {boolean} Returns `true` if validation passes.
 *
 * @throws {Error} Throws an error with a descriptive message if validation fails.
 *
 * @details
 * - Ensures the presence of the ID and required fields in the form.
 * - Validates the following fields:
 *   - `body_region_id`: required, must be a valid number.
 *   - `name`: required, max 50 characters.
 *   - `description`: optional, if present must be a string and max 255 characters.
 *   - `insurance_code`: optional, if present must be a string and max 25 characters.
 *   - `is_operated`: optional, if present must be string 'true' or 'false'.
 *
 * @example
 * const formData = new FormData();
 * formData.append('body_region_id', '1');
 * formData.append('name', 'Back Pain');
 * // ... add optional fields
 * validateAfflictionUpdateForm(1, formData); // returns true or throws error
 */

export function validateAfflictionUpdateForm(id: number, formData: FormData) {
  if (!id || !formData) {
    throw new Error('ID et formulaire requis pour la mise à jour.');
  }

  const body_region_id = formData.get('body_region_id')?.toString().trim();
  const name = formData.get('name')?.toString().trim();
  const description = formData.get('description')?.toString().trim();
  const insurance_code = formData.get('insurance_code')?.toString().trim();
  const is_operated = formData.get('is_operated')?.toString().trim();

  // Body region ID
  if (!body_region_id || isNaN(Number(body_region_id))) {
    throw new Error('La région du corps est invalide ou manquante.');
  }

  // Name
  if (!name) {
    throw new Error('Le nom de l’affection est requis.');
  } else if (name.length > 50) {
    throw new Error('Le nom ne doit pas dépasser 50 caractères.');
  }

  // Description (optional, but must be string and not too long)
  if (description && typeof description !== 'string') {
    throw new Error('La description doit être une chaîne de caractères.');
  } else if (description && description.length > 255) {
    throw new Error('La description ne doit pas dépasser 255 caractères.');
  }

  // Insurance code (optional)
  if (insurance_code && typeof insurance_code !== 'string') {
    throw new Error(
      'Le code de sécurité sociale doit être une chaîne de caractères.'
    );
  } else if (insurance_code && insurance_code.length > 25) {
    throw new Error(
      'Le code de sécurité sociale ne doit pas dépasser 25 caractères.'
    );
  }

  // is_operated (optional boolean flag as string)
  if (is_operated && is_operated !== 'true' && is_operated !== 'false') {
    throw new Error('Le champ "opéré" doit être "true" ou "false".');
  }

  return true;
}
