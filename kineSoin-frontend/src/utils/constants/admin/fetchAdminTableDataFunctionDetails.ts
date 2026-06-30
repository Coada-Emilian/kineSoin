import { fetchAfflictionsAsAdmin } from '../../functions/apiUtils/admin/affliction/fetchAfflictionsAsAdmin';
import { fetchInsurancesAsAdmin } from '../../functions/apiUtils/admin/insurance/fetchInsurancesAsAdmin';
import { fetchMedicsAsAdmin } from '../../functions/apiUtils/admin/medic/fetchMedicsAsAdmin';
import { fetchPatientsAsAdmin } from '../../functions/apiUtils/admin/patient/fetchPatientsAsAdmin';
import { fetchTherapistsAsAdmin } from '../../functions/apiUtils/admin/therapist/fetchTherapistsAsAdmin';

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
