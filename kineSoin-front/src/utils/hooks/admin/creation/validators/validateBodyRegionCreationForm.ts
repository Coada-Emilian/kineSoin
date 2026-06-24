export function validateBodyRegionCreationForm(formData: FormData) {
  const name = formData.get('name') as string;

  if (!name) {
    throw new Error('Veuillez saisir un nom pour la région du corps.');
  }

  if (name.length > 50) {
    throw new Error('Le nom ne doit pas dépasser 50 caractères.');
  }

  return true;
}
