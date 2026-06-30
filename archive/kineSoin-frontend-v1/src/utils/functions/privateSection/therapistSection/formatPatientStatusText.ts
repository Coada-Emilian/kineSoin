export const formatPatientStatusText = (status: string) => {
  switch (status) {
    case 'active':
      return 'ACTIF';
    case 'inactive':
      return 'INACTIF';
    case 'banned':
      return 'BANNI';
    default:
      return 'EN ATTENTE';
  }
};
