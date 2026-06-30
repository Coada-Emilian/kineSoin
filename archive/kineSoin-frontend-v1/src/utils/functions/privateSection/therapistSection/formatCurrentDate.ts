export function formatCurrentDate() {
  const currentDate = new Date();

  const formattedDate = currentDate
    .toLocaleDateString('fr-FR')
    .split('/')
    .join('/');

  return formattedDate;
}
