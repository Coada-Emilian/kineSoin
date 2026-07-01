import { fetchAfflictionAsAdmin } from '../../functions/apiUtils/admin/affliction/fetchAfflictionAsAdmin';
import { fetchInsuranceAsAdmin } from '../../functions/apiUtils/admin/insurance/fetchInsuranceAsAdmin';
import { fetchMedicAsAdmin } from '../../functions/apiUtils/admin/medic/fetchMedicAsAdmin';
import { fetchPatientAsAdmin } from '../../functions/apiUtils/admin/patient/fetchPatientAsAdmin';
import { fetchTherapistAsAdmin } from '../../functions/apiUtils/admin/therapist/fetchTherapistAsAdmin';

export const fetchAdminEntityDataFunctionDetails = [
  { entityType: 'therapist', fetchFunction: fetchTherapistAsAdmin },
  { entityType: 'patient', fetchFunction: fetchPatientAsAdmin },
  { entityType: 'affliction', fetchFunction: fetchAfflictionAsAdmin },
  { entityType: 'medic', fetchFunction: fetchMedicAsAdmin },
  { entityType: 'insurance', fetchFunction: fetchInsuranceAsAdmin },
];
