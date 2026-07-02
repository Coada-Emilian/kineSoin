import { useAfflictionUpdateMutation } from '../../../hooks/admin/update/useAfflictionUpdateMutation';
import { useInsuranceUpdateMutation } from '../../../hooks/admin/update/useInsuranceUpdateMutation';
import { useMedicUpdateMutation } from '../../../hooks/admin/update/useMedicUpdateMutation';
import { useTherapistUpdateMutation } from '../../../hooks/admin/update/useTherapistUpdateMutation';

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
