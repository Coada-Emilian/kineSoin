export function validateAfflictionCreationForm(formData: FormData) {
  const name = String(formData.get('name')).trim();
  const description = String(formData.get('description')).trim();
  const insuranceCode = String(formData.get('insurance_code')).trim();
  const bodyRegionId = String(formData.get('body_region_id')).trim();
  const operatedStatus = String(formData.get('is_operated')).trim();

  // Required fields
  if (
    !name ||
    !description ||
    !insuranceCode ||
    !bodyRegionId ||
    !operatedStatus
  ) {
    throw new Error('Veuillez remplir tous les champs.');
  }

  // Name
  if (name.length < 2) {
    throw new Error('Le nom doit contenir au moins 2 caractères.');
  }

  if (name.length > 50) {
    throw new Error('Le nom ne doit pas dépasser 50 caractères.');
  }

  // Description
  if (description.length < 5) {
    throw new Error('La description doit contenir au moins 5 caractères.');
  }

  if (description.length > 500) {
    throw new Error('La description ne doit pas dépasser 500 caractères.');
  }

  // Insurance code
  if (insuranceCode.length > 10) {
    throw new Error("Le code d'assurance ne doit pas dépasser 10 caractères.");
  }

  if (!/^[0-9A-Za-z-]+$/.test(insuranceCode)) {
    throw new Error("Le code d'assurance contient des caractères invalides.");
  }

  // Body region
  const parsedBodyRegionId = Number(bodyRegionId);

  if (!Number.isInteger(parsedBodyRegionId) || parsedBodyRegionId <= 0) {
    throw new Error("L'ID de la région corporelle doit être un nombre valide.");
  }

  // Operated status
  if (!['true', 'false'].includes(operatedStatus)) {
    throw new Error("Le statut opéré doit être 'true' ou 'false'.");
  }

  return true;
}
