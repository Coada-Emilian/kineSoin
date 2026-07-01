import { fetchAfflictionAsAdmin } from '../../api/admin/affliction/fetchAfflictionAsAdmin';
import { fetchInsuranceAsAdmin } from '../../api/admin/insurance/fetchInsuranceAsAdmin';
import { fetchMedicAsAdmin } from '../../api/admin/medic/fetchMedicAsAdmin';
import { fetchPatientAsAdmin } from '../../api/admin/patient/fetchPatientAsAdmin';
import { fetchTherapistAsAdmin } from '../../api/admin/therapist/fetchTherapistAsAdmin';

export const fetchAdminEntityDataFunctionDetails = [
  { entityType: 'therapist', fetchFunction: fetchTherapistAsAdmin },
  { entityType: 'patient', fetchFunction: fetchPatientAsAdmin },
  { entityType: 'affliction', fetchFunction: fetchAfflictionAsAdmin },
  { entityType: 'medic', fetchFunction: fetchMedicAsAdmin },
  { entityType: 'insurance', fetchFunction: fetchInsuranceAsAdmin },
];
