export const getEntityStatusText = (status: string | undefined) => {
  switch (status) {
    case 'active':
      return 'ACTIF';
    case 'inactive':
      return 'INACTIF';
    case 'pending':
      return 'EN ATTENTE';
    case 'banned':
      return 'BANNI';
    default:
      return '';
  }
};
