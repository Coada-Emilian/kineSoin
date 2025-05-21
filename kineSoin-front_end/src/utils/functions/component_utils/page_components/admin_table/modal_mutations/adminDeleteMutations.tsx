import { useMutation } from '@tanstack/react-query';
import { handleAfflictionDeletionAsAdmin } from '../../../../../apiUtils/adminApiUtils/affliction_utils/handleAfflictionDeletionAsAdmin';
import { handleInsuranceOrganismDeletionAsAdmin } from '../../../../../apiUtils/adminApiUtils/insurance_utils/handleInsuranceOrganismDeletionAsAdmin';
import { handleMedicDeletionAsAdmin } from '../../../../../apiUtils/adminApiUtils/medic_utils/handleMedicDeletionAsAdmin';
import { handlePatientDeletionAsAdmin } from '../../../../../apiUtils/adminApiUtils/patient_utils/handlePatientDeletionAsAdmin';
import { handleTherapistDeletionAsAdmin } from '../../../../../apiUtils/adminApiUtils/therapist_utils/adminTherapistApiUtils';

export default function getAdminDeleteMutations() {
  const handleTherapistDelete = useMutation({
    mutationKey: ['therapistDelete'],
    mutationFn: ({ id }: { id: number }) => handleTherapistDeletionAsAdmin(id),
    onSuccess: () => {
      setTimeout(() => {
        window.location.reload();
      }, 1000); // Delay of 1 second before reloading
    },
    onError: (error) => {
      console.error('Error deleting therapist:', error);
      alert('Failed to delete the therapist. Please try again.');
    },
  });

  const handlePatientDelete = useMutation({
    mutationKey: ['patientDelete'],
    mutationFn: ({ id }: { id: number }) => handlePatientDeletionAsAdmin(id),
    onSuccess: () => {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
    onError: (error) => {
      console.error('Error deleting patient:', error);
      alert('Failed to delete the patient. Please try again.');
    },
  });

  const handleAfflictionDelete = useMutation({
    mutationKey: ['afflictionDelete'],
    mutationFn: ({ id }: { id: number }) => handleAfflictionDeletionAsAdmin(id),
    onSuccess: () => {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
    onError: (error) => {
      console.error('Error deleting affliction:', error);
      alert('Failed to delete the affliction. Please try again.');
    },
  });

  const handleMedicDelete = useMutation({
    mutationKey: ['medicDelete'],
    mutationFn: ({ id }: { id: number }) => handleMedicDeletionAsAdmin(id),
    onSuccess: () => {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
    onError: (error) => {
      console.error('Error deleting medic:', error);
      alert('Failed to delete the medic. Please try again.');
    },
  });

  const handleInsuranceDelete = useMutation({
    mutationKey: ['insuranceDelete'],
    mutationFn: ({ id }: { id: number }) =>
      handleInsuranceOrganismDeletionAsAdmin(id),
    onSuccess: () => {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
    onError: (error) => {
      console.error('Error deleting insurance organism:', error);
      alert('Failed to delete the insurance organism. Please try again.');
    },
  });

  return {
    handleTherapistDelete,
    handlePatientDelete,
    handleAfflictionDelete,
    handleMedicDelete,
    handleInsuranceDelete,
  };
}
