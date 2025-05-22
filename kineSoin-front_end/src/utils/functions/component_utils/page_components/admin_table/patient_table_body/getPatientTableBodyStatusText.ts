export const getPatientTableBodyStatusText = (status: string) => {
  switch (status) {
    case 'active':
      return 'ACTIF';
    case 'inactive':
      return 'INACTIF';
    case 'banned':
      return 'BANNI';
    case 'pending':
      return 'EN ATTENTE';
    default:
      return 'INCONNU';
  }
};
