export const fetchTherapistPageTitle = (page: string): string => {
  switch (page) {
    case 'dashboard':
      return 'RDV de la journée';
    case 'appointments':
      return 'Rendez-vous';
    case 'patients':
      return 'Patients';
    case 'messages':
      return 'Messages';
    case 'profile':
      return 'Mes Informations';
    case 'prescriptions ':
      return 'Ordonnances';
    default:
      return 'KineSoin - Thérapeute';
  }
};
