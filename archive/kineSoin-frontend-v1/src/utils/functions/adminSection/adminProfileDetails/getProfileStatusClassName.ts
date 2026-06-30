export const getProfileStatusClassName = (status: string | undefined) => {
  switch (status) {
    case 'ACTIF':
      return 'bg-green-300 ';
    case 'INACTIF':
      return 'bg-gray-200 ';
    case 'EN ATTENTE':
      return 'bg-yellow-300 ';
    case 'BANNI':
      return 'bg-red-300 ';
    default:
      return 'bg-gray-200 ';
  }
};
