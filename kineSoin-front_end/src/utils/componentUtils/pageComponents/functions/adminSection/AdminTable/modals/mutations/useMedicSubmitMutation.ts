import { useMutation } from '@tanstack/react-query';
import { handleMedicCreationAsAdmin } from '../../../../../../../apiUtils/adminApiUtils/adminMedicApiUtils';

export const useSubmitMedicMutation = (
  onClose: () => void,
  setError: (msg: string) => void
) => {
  return useMutation({
    mutationKey: ['medicCreation'],
    mutationFn: async (formData: FormData) => {
      // Client-side validation before sending the request
      const medicName = formData.get('name') as string;
      const medicSurname = formData.get('surname') as string;
      const medicLicenceCode = formData.get('licence_code') as string;
      const medicStreetNumber = formData.get('street_number') as string;
      const medicStreetName = formData.get('street_name') as string;
      const medicPostalCode = formData.get('postal_code') as string;
      const medicCity = formData.get('city') as string;
      const medicPrefix = formData.get('prefix') as string;
      const medicTelephone = formData.get('phone_number') as string;
      const medicFullTelephone = `${medicPrefix}${medicTelephone}`;

      if (
        !medicName ||
        !medicSurname ||
        !medicLicenceCode ||
        !medicStreetNumber ||
        !medicStreetName ||
        !medicPostalCode ||
        !medicCity ||
        !medicPrefix ||
        !medicTelephone
      ) {
        throw new Error('Veuillez remplir tous les champs.');
      } else if (medicName.length > 50) {
        throw new Error('Le nom ne doit pas dépasser 50 caractères.');
      } else if (medicSurname.length > 50) {
        throw new Error('Le prénom ne doit pas dépasser 50 caractères.');
      } else if (medicLicenceCode.length > 9) {
        throw new Error('Le code ADELI ne doit pas dépasser 9 caractères.');
      } else if (medicStreetNumber.length > 10) {
        throw new Error('Le numéro de rue ne doit pas dépasser 10 caractères.');
      } else if (medicStreetName.length > 50) {
        throw new Error('Le nom de rue ne doit pas dépasser 50 caractères.');
      } else if (medicPostalCode.length > 10) {
        throw new Error('Le code postal ne doit pas dépasser 10 caractères.');
      } else if (medicCity.length > 100) {
        throw new Error('La ville ne doit pas dépasser 100 caractères.');
      } else if (medicPrefix.length > 10) {
        throw new Error('Le préfixe ne doit pas dépasser 10 caractères.');
      } else if (medicTelephone.length > 15) {
        throw new Error(
          'Le numéro de téléphone ne doit pas dépasser 15 caractères.'
        );
      } else if (!/^\d+$/.test(medicTelephone)) {
        throw new Error('Le numéro de téléphone doit être un nombre valide.');
      } else {
        formData.append('full_phone_number', medicFullTelephone);
      }

      return handleMedicCreationAsAdmin(formData);
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
        'Une erreur est survenue lors de la creation du médecin.';
      setError(errorMessage);
    },
  });
};
