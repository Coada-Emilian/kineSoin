/**
 * @hook useSubmitAffliction
 *
 * A custom React Query mutation hook to handle the submission of a new affliction. This function performs client-side
 * validation before sending the data to the backend and updates the UI accordingly.
 *
 * @param {() => void} onClose - Callback function to close the modal on success.
 * @param {(msg: string) => void} setError - Function to update the global error message.
 *
 * @returns {Mutation} - Returns a React Query mutation object for handling affliction creation.
 *
 * @example
 * const submitAfflictionMutation = useSubmitAffliction(onClose, setError);
 * submitAfflictionMutation.mutate(formData);
 *
 * @remarks
 * - Ensures that all required fields are filled before submission.
 * - Performs strict validation on field lengths and formats.
 * - On success, closes the modal and reloads the page after 3 seconds.
 * - On error, sets an appropriate error message in the global context.
 */

import { useMutation } from '@tanstack/react-query';
import { handleAfflictionCreationAsAdmin } from '../../../../../../../apiUtils/adminApiUtils/adminAfflictionApiUtils';

export const useSubmitAffliction = (
  onClose: () => void,
  setError: (msg: string) => void
) => {
  return useMutation({
    mutationKey: ['afflictionCreation'],
    mutationFn: async (formData: FormData) => {
      // Client-side validation before sending the request
      const afflictionName = formData.get('name') as string;
      const afflictionDescription = formData.get('description') as string;
      const afflictionInsuranceCode = formData.get('insurance_code') as string;
      const afflictionBodyRegionId = formData.get('body_region_id') as string;
      const afflictionOperatedStatus = formData.get('is_operated') as string;

      if (
        !afflictionName ||
        !afflictionDescription ||
        !afflictionInsuranceCode ||
        !afflictionBodyRegionId ||
        !afflictionOperatedStatus
      ) {
        throw new Error('Veuillez remplir tous les champs.');
      } else if (afflictionName.length > 50) {
        throw new Error('Le nom ne doit pas dépasser 50 caractères.');
      } else if (afflictionDescription.length > 500) {
        throw new Error('La description ne doit pas dépasser 500 caractères.');
      } else if (afflictionInsuranceCode.length > 10) {
        throw new Error(
          "Le code d'assurance ne doit pas dépasser 10 caractères."
        );
      } else if (!/^\d+$/.test(afflictionBodyRegionId)) {
        throw new Error(
          "L'ID de la région corporelle doit être un nombre valide."
        );
      } else if (!/^[0-9A-Za-z]{1,10}$/.test(afflictionInsuranceCode)) {
        throw new Error(
          "Le code d'assurance doit être un code valide (chiffres et/ou lettres)."
        );
      } else if (!['true', 'false'].includes(afflictionOperatedStatus)) {
        throw new Error("Le statut opéré doit être 'true' ou 'false'.");
      }

      return handleAfflictionCreationAsAdmin(formData);
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
