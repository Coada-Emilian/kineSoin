import { useAfflictionUpdateMutation } from '../../../functions/component_utils/page_components/admin_profile_details/mutations/useAfflictionUpdateMutation';
import { useInsuranceUpdateMutation } from '../../../functions/component_utils/page_components/admin_profile_details/mutations/useInsuranceUpdateMutation';
import { useMedicUpdateMutation } from '../../../functions/component_utils/page_components/admin_profile_details/mutations/useMedicUpdateMutation';
import { useTherapistUpdateMutation } from '../../../functions/component_utils/page_components/admin_profile_details/mutations/useTherapistUpdateMutation';

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
