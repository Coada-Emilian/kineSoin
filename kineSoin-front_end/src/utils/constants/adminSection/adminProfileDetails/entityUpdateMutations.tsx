/**
 * @function entityUpdateMutations
 *
 * Returns an array of entity type configurations with their corresponding update mutation hooks.
 * Used to dynamically assign the correct update mutation based on the entity type in admin profile logic.
 *
 * @returns {Array<Object>} Array of objects where each object represents an entity type and its corresponding mutation hook.
 *
 * @example
 * const mutationEntry = entityUpdateMutations().find(
 *   (entry) => entry.entityType === entityType && entry.updateFunction
 * );
 * const updateMutation = mutationEntry?.updateFunction?.();
 *
 * @details
 * - Maps each supported entity type (therapist, affliction, medic, insurance) to its respective mutation hook.
 * - `patient` is included in the array but currently does not have an `updateFunction` associated.
 * - This structure enables centralized and dynamic retrieval of mutation logic within admin components.
 */

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
