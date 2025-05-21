/**
 * @function useSubmitRegion
 *
 * Custom hook to handle the creation of a body region. It uses `useMutation` from React Query
 * to submit the form data for creating a new region and handle success and error scenarios.
 *
 * The hook validates the region name, ensuring it's not empty or too long. If the submission
 * succeeds, the modal is closed, and the page reloads after a brief delay. If there is an error,
 * the error message is set using the provided `setError` function.
 *
 * @param onClose - A function to close the modal when the region is successfully created.
 * @param setError - A function to set an error message if the creation fails.
 *
 * @returns {MutationResult} - The mutation result object from `useMutation`, which contains
 * the state and methods for handling the mutation.
 *
 * @example
 * const { mutate } = useSubmitRegion(onClose, setError);
 *
 * @remarks
 * - The mutation checks for a valid region name and ensures it does not exceed 50 characters.
 * - If successful, it triggers the `onClose` function and reloads the page after a short delay.
 * - If an error occurs, it updates the error message using `setError`.
 */

import { useMutation } from '@tanstack/react-query';
import { handleBodyRegionCreationAsAdmin } from '../../../../../apiUtils/adminApiUtils/body_region_utils/adminBodyRegionApiUtils';

export const useSubmitRegionMutation = (
  onClose: () => void,
  setError: (msg: string) => void
) => {
  return useMutation({
    mutationKey: ['regionCreation'],
    mutationFn: async (formData: FormData) => {
      const regionName = formData.get('name') as string;

      if (!regionName) {
        throw new Error('Veuillez remplir tous les champs.');
      } else if (regionName.length > 50) {
        throw new Error('Le nom ne doit pas dépasser 50 caractères.');
      }

      return handleBodyRegionCreationAsAdmin(formData);
    },
    onSuccess: () => {
      onClose();
      setTimeout(() => {
        window.location.reload();
      }, 500);
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        'Une erreur est survenue.';
      setError(errorMessage);
    },
  });
};
