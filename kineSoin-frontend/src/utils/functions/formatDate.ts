export const formatDate = (date: string | Date) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};
