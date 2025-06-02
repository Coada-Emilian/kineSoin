import { useMutation } from '@tanstack/react-query';
import { handleAfflictionUpdateAsAdmin } from '../../../../../apiUtils/adminApiUtils/affliction_utils/handleAfflictionUpdateAsAdmin';

export const useAfflictionUpdateMutation = () => {
  return useMutation({
    mutationKey: ['afflictionUpdate'],
    mutationFn: async ({
      id,
      formData,
    }: {
      id: number;
      formData: FormData;
    }) => {
      if (!id || !formData) {
        throw new Error('ID and formData are required for update');
      }

      // Extract values
      const body_region_id = formData.get('body_region_id');
      const name = formData.get('name');
      const description = formData.get('description');
      const insurance_code = formData.get('insurance_code');
      const is_operated = formData.get('is_operated');

      // Validation
      if (!body_region_id || isNaN(Number(body_region_id))) {
        throw new Error('Region du corps invalide ou manquante.');
      }

      if (!name || typeof name !== 'string' || name.length > 50) {
        throw new Error('Nom requis et ne doit pas dépasser 50 caractères.');
      }

      if (description && typeof description !== 'string') {
        throw new Error('La description doit être une chaîne de caractères.');
      }

      if (insurance_code && typeof insurance_code !== 'string') {
        throw new Error('Le code de sécurité sociale doit être une chaîne.');
      }

      if (is_operated && is_operated !== 'true' && is_operated !== 'false') {
        throw new Error('Le champ "opéré" doit être "true" ou "false".');
      }

      // All validations passed
      return await handleAfflictionUpdateAsAdmin(id, formData);
    },
    onSuccess: () => {
      console.log('Affliction profile updated successfully');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
    onError: (error) => {
      console.error('Failed to update affliction profile', error);
    },
  });
};
