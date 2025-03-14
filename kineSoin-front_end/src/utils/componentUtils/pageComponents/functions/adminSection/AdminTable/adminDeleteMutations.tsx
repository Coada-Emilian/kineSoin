/**
 * @function getAdminDeleteMutations
 *
 * This function provides React Query mutation hooks for deleting different administrative entities,
 * including therapists, patients, afflictions, medics, and insurance organisms.
 * Each mutation triggers a delete request to the respective API and handles success or error responses.
 *
 * @returns {Object} - An object containing mutation hooks for deleting various entities.
 *
 * @property {UseMutationResult} handleTherapistDelete - Mutation for deleting a therapist.
 * @property {UseMutationResult} handlePatientDelete - Mutation for deleting a patient.
 * @property {UseMutationResult} handleAfflictionDelete - Mutation for deleting an affliction.
 * @property {UseMutationResult} handleMedicDelete - Mutation for deleting a medic.
 * @property {UseMutationResult} handleInsuranceDelete - Mutation for deleting an insurance organism.
 *
 * @example
 * const { handleTherapistDelete } = getAdminDeleteMutations();
 * handleTherapistDelete.mutate({ id: 1 });
 *
 * @remarks
 * - Each mutation has a 1-second delay before reloading the page to allow UI updates.
 * - Errors are logged to the console and displayed via an alert for better debugging.
 * - React Query ensures efficient data fetching and caching mechanisms.
 */

import { useMutation } from '@tanstack/react-query';
import { handleTherapistDeleteAsAdmin } from '../../../../../apiUtils/adminApiUtils/adminTherapistApiUtils';
import { handlePatientDeleteAsAdmin } from '../../../../../apiUtils/adminApiUtils/adminPatientApiUtils';
import { handleAfflictionDeleteAsAdmin } from '../../../../../apiUtils/adminApiUtils/adminAfflictionApiUtils';
import { handleMedicDeleteAsAdmin } from '../../../../../apiUtils/adminApiUtils/adminMedicApiUtils';
import { handleInsuranceOrganismDeleteAsAdmin } from '../../../../../apiUtils/adminApiUtils/adminInsuranceApiUtils';

export default function getAdminDeleteMutations() {
  const handleTherapistDelete = useMutation({
    mutationKey: ['therapistDelete'],
    mutationFn: ({ id }: { id: number }) => handleTherapistDeleteAsAdmin(id),
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
    mutationFn: ({ id }: { id: number }) => handlePatientDeleteAsAdmin(id),
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
    mutationFn: ({ id }: { id: number }) => handleAfflictionDeleteAsAdmin(id),
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
    mutationFn: ({ id }: { id: number }) => handleMedicDeleteAsAdmin(id),
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
      handleInsuranceOrganismDeleteAsAdmin(id),
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
