import type { TherapistPatientQuickNavFilter } from '../../../@types/interfaces/therapistInterfaces';

const therapistPatientsQuickNavFilters: TherapistPatientQuickNavFilter[] = [
  { key: 'all', label: 'Tous', buttonType: 'send' },
  { key: 'active', label: 'Actifs', buttonType: 'active' },
  {
    key: 'inactive',
    label: 'Inactifs',
    buttonType: 'inactive',
  },
  {
    key: 'pending',
    label: 'En attente',
    buttonType: 'pending',
  },
];

export default therapistPatientsQuickNavFilters;
