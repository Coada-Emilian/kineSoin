export const fetchTherapistPageTitle = (page: string): string => {
  switch (page) {
    case 'dashboard':
      return 'RDV de la journée';
    case 'agenda':
      return 'Agenda';
    case 'patients':
      return 'Tous les patients';
    case 'messages':
      return 'Messages';
    case 'my-profile':
      return 'Mes Informations';
    case 'prescriptions':
      return 'Ordonnances';
    case 'patient/:patientId':
      return 'Détails du patient';
    case 'patient/:patientId/appointments':
      return 'Rendez-vous du patient';
    default:
      return 'KineSoin - Thérapeute';
  }
};
