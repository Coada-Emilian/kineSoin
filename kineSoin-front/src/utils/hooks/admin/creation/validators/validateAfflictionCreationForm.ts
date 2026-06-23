export function validateAfflictionCreationForm(formData: FormData) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const insuranceCode = formData.get('insurance_code') as string;
  const bodyRegionId = formData.get('body_region_id') as string;
  const operatedStatus = formData.get('is_operated') as string;

  if (
    !name ||
    !description ||
    !insuranceCode ||
    !bodyRegionId ||
    !operatedStatus
  ) {
    throw new Error('Veuillez remplir tous les champs.');
  } else if (name.length > 50) {
    throw new Error('Le nom ne doit pas dépasser 50 caractères.');
  } else if (description.length > 500) {
    throw new Error('La description ne doit pas dépasser 500 caractères.');
  } else if (insuranceCode.length > 10) {
    throw new Error("Le code d'assurance ne doit pas dépasser 10 caractères.");
  } else if (!/^\d+$/.test(bodyRegionId)) {
    throw new Error("L'ID de la région corporelle doit être un nombre valide.");
  } else if (!/^[0-9A-Za-z]{1,10}$/.test(insuranceCode)) {
    throw new Error(
      "Le code d'assurance doit être un code valide (chiffres et/ou lettres)."
    );
  } else if (!['true', 'false'].includes(operatedStatus)) {
    throw new Error("Le statut opéré doit être 'true' ou 'false'.");
  }

  return true;
}
