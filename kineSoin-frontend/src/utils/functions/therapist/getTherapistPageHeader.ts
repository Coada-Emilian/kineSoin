import type { TherapistPageHeader } from '../../../@types/types/therapistTypes';

export const getTherapistPageHeader = (page: string): TherapistPageHeader => {
  switch (page) {
    case 'dashboard':
      return {
        title: 'Tableau de bord',
        subtitle: "Suivez votre activité d'aujourd'hui.",
      };

    case 'agenda':
      return {
        title: 'Agenda',
        subtitle: 'Organisez vos rendez-vous.',
      };

    case 'patients':
      return {
        title: 'Patients',
        subtitle: 'Consultez et gérez les dossiers de vos patients.',
      };

    case 'messages':
      return {
        title: 'Messages',
        subtitle: 'Échangez avec vos patients.',
      };

    case 'my-profile':
      return {
        title: 'Mes informations',
        subtitle: 'Gérez vos informations personnelles.',
      };

    case 'prescriptions':
      return {
        title: 'Ordonnances',
        subtitle: 'Consultez et rédigez des ordonnances.',
      };

    case 'patient/:patientId':
      return {
        title: 'Détails du patient',
      };

    case 'patient/:patientId/appointments':
      return {
        title: 'Rendez-vous du patient',
      };

    default:
      return {
        title: 'Espace thérapeute',
      };
  }
};
