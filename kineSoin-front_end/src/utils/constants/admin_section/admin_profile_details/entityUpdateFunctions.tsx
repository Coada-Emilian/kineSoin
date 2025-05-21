import { handleAfflictionUpdateAsAdmin } from '../../../apiUtils/adminApiUtils/affliction_utils/adminAfflictionApiUtils';
import { handleInsuranceOrganismUpdateAsAdmin } from '../../../apiUtils/adminApiUtils/insurance_utils/adminInsuranceApiUtils';
import { handleMedicUpdateAsAdmin } from '../../../apiUtils/adminApiUtils/medic_utils/adminMedicApiUtils';
import { handleTherapistUpdateAsAdmin } from '../../../apiUtils/adminApiUtils/therapist_utils/adminTherapistApiUtils';

// Define and export the entityDetails array
export const entityUpdateFunctions = () => [
  {
    entityType: 'therapist',
    updateFunction: handleTherapistUpdateAsAdmin,
  },
  { entityType: 'patient' },
  {
    entityType: 'affliction',
    updateFunction: handleAfflictionUpdateAsAdmin,
  },
  {
    entityType: 'medic',
    updateFunction: handleMedicUpdateAsAdmin,
  },
  {
    entityType: 'insurance',
    updateFunction: handleInsuranceOrganismUpdateAsAdmin,
  },
];
