import { useMutation } from '@tanstack/react-query';
import { handleAfflictionCreationAsAdmin } from '../../../../../../apiUtils/adminApiUtils/affliction_utils/adminAfflictionApiUtils';

export const useSubmitAfflictionMutation = (onClose: () => void) => {
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
      console.error('Error creating affliction:', errorMessage);
    },
  });
};
