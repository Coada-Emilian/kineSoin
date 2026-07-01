export const formatDate = (date: string) => {
  const normalDate = new Date(date);

  const formattedDate = normalDate
    .toLocaleDateString('fr-FR')
    .split('/')
    .join('/');

  return formattedDate;
};
