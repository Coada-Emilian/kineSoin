import { handleAfflictionUpdateAsAdmin } from '../../../../../apiUtils/adminApiUtils/adminAfflictionApiUtils';
import { handleInsuranceOrganismUpdateAsAdmin } from '../../../../../apiUtils/adminApiUtils/adminInsuranceApiUtils';
import { handleMedicUpdateAsAdmin } from '../../../../../apiUtils/adminApiUtils/adminMedicApiUtils';
import { handleTherapistUpdateAsAdmin } from '../../../../../apiUtils/adminApiUtils/adminTherapistApiUtils';

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
