import { useMutation } from '@tanstack/react-query';
import { handleTherapistUpdateAsAdmin } from '../../../../../apiUtils/adminApiUtils/therapist_utils/handleTherapistUpdateAsAdmin';

export const useTherapistUpdateMutation = () => {
  return useMutation({
    mutationKey: ['therapistUpdate'],
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

      // Extract values from formData
      const name = formData.get('name')?.toString().trim();
      const surname = formData.get('surname')?.toString().trim();
      const email = formData.get('email')?.toString().trim();
      const prefix = formData.get('prefix')?.toString().trim();
      const phone_number = formData.get('phone_number')?.toString().trim();
      const licence_code = formData.get('licence_code')?.toString().trim();
      const diploma = formData.get('diploma')?.toString().trim();
      const specialty = formData.get('specialty')?.toString().trim();
      const experience = formData.get('experience')?.toString().trim();
      const description = formData.get('description')?.toString().trim();

      // Validate each field (basic example)
      if (!name || name.length < 2)
        throw new Error('Le prénom doit contenir au moins 2 caractères.');

      if (!surname || surname.length < 2)
        throw new Error('Le nom doit contenir au moins 2 caractères.');

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        throw new Error("L'email n'est pas valide.");

      if (!prefix || typeof prefix !== 'string' || !/^\+\d+$/.test(prefix)) {
        throw new Error('Le préfixe doit commencer par "+" suivi de chiffres.');
      }

      if (!phone_number || !/^\d{9,15}$/.test(phone_number))
        throw new Error('Numéro de téléphone invalide.');

      if (!licence_code || licence_code.length < 3)
        throw new Error('Code licence invalide.');

      if (!diploma) throw new Error('Le diplôme est requis.');

      if (!specialty) throw new Error('La spécialité est requise.');

      if (!experience) throw new Error("L'expérience est requise");

      if (!description || description.length < 10)
        throw new Error('La description doit contenir au moins 10 caractères.');

      // If all validations pass, proceed
      return await handleTherapistUpdateAsAdmin(id, formData);
    },
    onSuccess: () => {
      console.log('Therapist profile updated successfully');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
    onError: (error) => {
      console.error('Failed to update therapist profile', error);
    },
  });
};
