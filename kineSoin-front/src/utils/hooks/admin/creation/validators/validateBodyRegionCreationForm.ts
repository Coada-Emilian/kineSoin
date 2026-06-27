export function validateBodyRegionCreationForm(formData: FormData) {
  const name = String(formData.get('name')).trim();

  if (!name) {
    throw new Error('Veuillez saisir un nom pour la région du corps.');
  }

  if (name.length < 3) {
    throw new Error('Le nom de la région doit contenir au moins 3 caractères.');
  }

  if (name.length > 50) {
    throw new Error('Le nom ne doit pas dépasser 50 caractères.');
  }

  if (!/^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[-' ][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/.test(name)) {
    throw new Error(
      'Le nom de la région ne doit contenir que des lettres, espaces, tirets ou apostrophes.'
    );
  }

  return true;
}
