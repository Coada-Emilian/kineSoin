import type { TherapistPatientQuickNavFilter } from '../../../@types/interfaces/therapistInterfaces';

const therapistPatientsQuickNavFilters: TherapistPatientQuickNavFilter[] = [
  { key: 'all', label: 'Tous les patients', buttonType: 'send' },
  { key: 'self', label: 'Mes patients', buttonType: 'basic' },
  {
    key: 'pending',
    label: 'En attente',
    buttonType: 'pending',
  },
  {
    key: 'inactive',
    label: 'Inactifs',
    buttonType: 'inactive',
  },
];

export default therapistPatientsQuickNavFilters;
