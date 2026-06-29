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
