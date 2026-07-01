import { fetchAfflictionsAsAdmin } from '../../api/admin/affliction/fetchAfflictionsAsAdmin';
import { fetchInsurancesAsAdmin } from '../../api/admin/insurance/fetchInsurancesAsAdmin';
import { fetchMedicsAsAdmin } from '../../api/admin/medic/fetchMedicsAsAdmin';
import { fetchPatientsAsAdmin } from '../../api/admin/patient/fetchPatientsAsAdmin';
import { fetchTherapistsAsAdmin } from '../../api/admin/therapist/fetchTherapistsAsAdmin';

export const fetchAdminTableDataFunctionDetails = [
  { entityType: 'therapist', fetchFunction: fetchTherapistsAsAdmin },
  { entityType: 'patient', fetchFunction: fetchPatientsAsAdmin },
  { entityType: 'affliction', fetchFunction: fetchAfflictionsAsAdmin },
  { entityType: 'medic', fetchFunction: fetchMedicsAsAdmin },
  {
    entityType: 'insurance',
    fetchFunction: fetchInsurancesAsAdmin,
  },
];
