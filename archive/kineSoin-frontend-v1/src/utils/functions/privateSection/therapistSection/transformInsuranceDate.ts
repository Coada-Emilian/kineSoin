export const transformInsuranceDate = (date: string | undefined) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('fr-FR');
};
