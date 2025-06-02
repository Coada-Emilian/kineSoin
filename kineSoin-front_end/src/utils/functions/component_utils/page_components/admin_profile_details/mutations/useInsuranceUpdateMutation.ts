import { useMutation } from '@tanstack/react-query';
import { handleInsuranceOrganismUpdateAsAdmin } from '../../../../../apiUtils/adminApiUtils/insurance_utils/handleInsuranceOrganismUpdateAsAdmin';

export const useInsuranceUpdateMutation = () => {
  return useMutation({
    mutationKey: ['insuranceUpdate'],
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

      const name = formData.get('name');
      const prefix = formData.get('prefix');
      const phone_number = formData.get('phone_number');
      const street_number = formData.get('street_number');
      const street_name = formData.get('street_name');
      const postal_code = formData.get('postal_code');
      const city = formData.get('city');
      const amc_code = formData.get('amc_code');

      // Validation logic
      if (
        !name ||
        typeof name !== 'string' ||
        name.trim().length === 0 ||
        name.length > 100
      ) {
        throw new Error('Nom invalide ou manquant.');
      }

      if (
        !prefix ||
        typeof prefix !== 'string' ||
        !/^\+\d{1,5}$/.test(prefix)
      ) {
        throw new Error(
          'Préfixe invalide. Il doit commencer par "+" suivi de chiffres.'
        );
      }

      if (
        !phone_number ||
        typeof phone_number !== 'string' ||
        !/^\d{6,15}$/.test(phone_number)
      ) {
        throw new Error(
          'Numéro de téléphone invalide. Il doit contenir uniquement des chiffres (6 à 15).'
        );
      }

      if (
        !street_number ||
        typeof street_number !== 'string' ||
        !/^\d{1,5}$/.test(street_number)
      ) {
        throw new Error('Numéro de rue invalide ou manquant.');
      }

      if (
        !street_name ||
        typeof street_name !== 'string' ||
        street_name.trim().length === 0
      ) {
        throw new Error('Nom de rue invalide ou manquant.');
      }

      if (
        !postal_code ||
        typeof postal_code !== 'string' ||
        !/^\d{4,10}$/.test(postal_code)
      ) {
        throw new Error('Code postal invalide ou manquant.');
      }

      if (!city || typeof city !== 'string' || city.trim().length === 0) {
        throw new Error('Ville invalide ou manquante.');
      }

      if (
        !amc_code ||
        typeof amc_code !== 'string' ||
        amc_code.trim().length === 0
      ) {
        throw new Error('Code AMC invalide ou manquant.');
      }

      return await handleInsuranceOrganismUpdateAsAdmin(id, formData);
    },
    onSuccess: () => {
      console.log('Insurance details updated successfully');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
    onError: (error) => {
      console.error('Failed to update insurance details', error);
    },
  });
};
