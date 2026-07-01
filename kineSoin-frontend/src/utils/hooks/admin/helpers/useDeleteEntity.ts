import type { UseDeleteEntityFunctionProps } from '../../../../@types/props/functionProps';
import { useAfflictionDeletionMutation } from '../deletion/useAfflictionDeletionMutation';
import { useInsuranceDeletionMutation } from '../deletion/useInsuranceDeletionMutation';
import { useMedicDeletionMutation } from '../deletion/useMedicDeletionMutation';
import { usePatientDeletionMutation } from '../deletion/usePatientDeletionMutation';
import { useTherapistDeletionMutation } from '../deletion/useTherapistDeletionMutation';

export function useDeleteEntity() {
  const therapistMutation = useTherapistDeletionMutation();
  const patientMutation = usePatientDeletionMutation();
  const medicMutation = useMedicDeletionMutation();
  const afflictionMutation = useAfflictionDeletionMutation();
  const insuranceMutation = useInsuranceDeletionMutation();

  const deleteEntity = ({ entityType, id }: UseDeleteEntityFunctionProps) => {
    switch (entityType) {
      case 'therapist':
        therapistMutation.mutate({ id });
        break;

      case 'patient':
        patientMutation.mutate({ id });
        break;

      case 'medic':
        medicMutation.mutate({ id });
        break;

      case 'affliction':
        afflictionMutation.mutate({ id });
        break;

      case 'insurance':
        insuranceMutation.mutate({ id });
        break;
    }
  };

  const isPending =
    therapistMutation.isPending ||
    patientMutation.isPending ||
    medicMutation.isPending ||
    afflictionMutation.isPending ||
    insuranceMutation.isPending;

  return {
    deleteEntity,
    isPending,
  };
}
