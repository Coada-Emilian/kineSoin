import { useAfflictionUpdateMutation } from '../../../functions/adminSection/adminProfileDetails/mutations/useAfflictionUpdateMutation';
import { useInsuranceUpdateMutation } from '../../../functions/adminSection/adminProfileDetails/mutations/useInsuranceUpdateMutation';
import { useMedicUpdateMutation } from '../../../functions/adminSection/adminProfileDetails/mutations/useMedicUpdateMutation';
import { useTherapistUpdateMutation } from '../../../functions/adminSection/adminProfileDetails/mutations/useTherapistUpdateMutation';

export const entityUpdateMutations = () => [
  {
    entityType: 'therapist',
    updateFunction: useTherapistUpdateMutation,
  },
  { entityType: 'patient' },
  {
    entityType: 'affliction',
    updateFunction: useAfflictionUpdateMutation,
  },
  {
    entityType: 'medic',
    updateFunction: useMedicUpdateMutation,
  },
  {
    entityType: 'insurance',
    updateFunction: useInsuranceUpdateMutation,
  },
];
