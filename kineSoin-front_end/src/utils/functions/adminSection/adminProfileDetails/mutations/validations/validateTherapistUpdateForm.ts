/**
 * @function validateTherapistUpdateForm
 *
 * Validates the update form data for a therapist's profile.
 *
 * @param {number} id - The ID of the therapist being updated.
 * @param {FormData} formData - The form data containing updated therapist details.
 *
 * @returns {boolean} Returns `true` if validation passes.
 *
 * @throws {Error} Throws an error with a descriptive message if validation fails.
 *
 * @details
 * - Ensures the presence of the ID and required fields in the form.
 * - Validates the following fields:
 *   - `name`: required, 2–50 characters.
 *   - `surname`: required, 2–50 characters.
 *   - `email`: required, must be valid, max 255 characters.
 *   - `prefix`: required, must start with `+` and digits, max 10 characters.
 *   - `phone_number`: required, 9–15 digits.
 *   - `licence_code`: required, 3–9 characters.
 *   - `diploma`, `specialty`, `experience`: required, max 255 characters.
 *   - `description`: required, at least 10 characters.
 *
 * @example
 * const formData = new FormData();
 * formData.append('name', 'John');
 * formData.append('surname', 'Doe');
 * // ... add all required fields
 * validateTherapistUpdateForm(1, formData); // returns true or throws error
 */

export function validateTherapistUpdateForm(id: number, formData: FormData) {
  if (!id || !formData) {
    throw new Error('ID et formulaire requis pour la mise à jour.');
  }

  const name = formData.get('name')?.toString().trim();
  const surname = formData.get('surname')?.toString().trim();
  const email = formData.get('email')?.toString().trim();
  const prefix = formData.get('prefix')?.toString().trim();
  const phone_number = formData.get('phone_number')?.toString().trim();
  const licence_code = formData.get('licence_code')?.toString().trim();
  const diploma = formData.get('diploma')?.toString().trim();
  const specialty = formData.get('specialty')?.toString().trim();
  const experience = formData.get('experience')?.toString().trim();
  const description = formData.get('description')?.toString().trim();

  if (!name || name.length < 2) {
    throw new Error('Le prénom doit contenir au moins 2 caractères.');
  } else if (name.length > 50) {
    throw new Error('Le prénom ne doit pas dépasser 50 caractères.');
  }

  if (!surname || surname.length < 2) {
    throw new Error('Le nom doit contenir au moins 2 caractères.');
  } else if (surname.length > 50) {
    throw new Error('Le nom ne doit pas dépasser 50 caractères.');
  }

  if (!email) {
    throw new Error("L'email est requis.");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("L'email n'est pas valide.");
  } else if (email.length > 255) {
    throw new Error("L'email ne doit pas dépasser 255 caractères.");
  }

  if (!prefix) {
    throw new Error('Le préfixe est requis.');
  } else if (!/^\+\d+$/.test(prefix)) {
    throw new Error('Le préfixe doit commencer par "+" suivi de chiffres.');
  } else if (prefix.length > 10) {
    throw new Error('Le préfixe ne doit pas dépasser 10 caractères.');
  }

  if (!phone_number) {
    throw new Error('Le numéro de téléphone est requis.');
  } else if (!/^\d{9,15}$/.test(phone_number)) {
    throw new Error(
      'Le numéro de téléphone doit contenir entre 9 et 15 chiffres.'
    );
  }

  if (!licence_code || licence_code.length < 3) {
    throw new Error('Le code licence doit contenir au moins 3 caractères.');
  } else if (licence_code.length > 9) {
    throw new Error('Le code licence ne doit pas dépasser 9 caractères.');
  }

  if (!diploma) {
    throw new Error('Le diplôme est requis.');
  } else if (diploma.length > 255) {
    throw new Error('Le diplôme ne doit pas dépasser 255 caractères.');
  }

  if (!specialty) {
    throw new Error('La spécialité est requise.');
  } else if (specialty.length > 255) {
    throw new Error('La spécialité ne doit pas dépasser 255 caractères.');
  }

  if (!experience) {
    throw new Error("L'expérience est requise.");
  } else if (experience.length > 255) {
    throw new Error("L'expérience ne doit pas dépasser 255 caractères.");
  }

  if (!description || description.length < 10) {
    throw new Error('La description doit contenir au moins 10 caractères.');
  }

  return true;
}
