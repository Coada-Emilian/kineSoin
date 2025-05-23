import { useMutation } from '@tanstack/react-query';
import { handleInsuranceOrganismCreationAsAdmin } from '../../../../../../apiUtils/adminApiUtils/insurance_utils/handleInsuranceOrganismCreationAsAdmin';

export const useSubmitInsuranceMutation = (onClose: () => void) => {
  return useMutation({
    mutationKey: ['insuranceCreation'],
    mutationFn: async (formData: FormData) => {
      const insuranceName = formData.get('name') as string;
      const insuranceLicenceCode = formData.get('amc_code') as string;
      const insuranceStreetNumber = formData.get('street_number') as string;
      const insuranceStreetName = formData.get('street_name') as string;
      const insurancePostalCode = formData.get('postal_code') as string;
      const insuranceCity = formData.get('city') as string;
      const insurancePrefix = formData.get('prefix') as string;
      const insuranceTelephone = formData.get('phone_number') as string;

      if (
        !insuranceName ||
        !insuranceLicenceCode ||
        !insuranceStreetNumber ||
        !insuranceStreetName ||
        !insurancePostalCode ||
        !insuranceCity ||
        !insurancePrefix ||
        !insuranceTelephone
      ) {
        throw new Error('Veuillez remplir tous les champs.');
      } else if (insuranceName.length > 50) {
        throw new Error('Le nom ne doit pas dépasser 50 caractères.');
      } else if (insuranceLicenceCode.length > 10) {
        throw new Error(
          "Le code d'assurance ne doit pas dépasser 10 caractères."
        );
      } else if (insuranceStreetNumber.length > 10) {
        throw new Error('Le numéro de rue ne doit pas dépasser 10 caractères.');
      } else if (insuranceStreetName.length > 50) {
        throw new Error('Le nom de rue ne doit pas dépasser 50 caractères.');
      } else if (insurancePostalCode.length > 10) {
        throw new Error('Le code postal ne doit pas dépasser 10 caractères.');
      } else if (insuranceCity.length > 100) {
        throw new Error('La ville ne doit pas dépasser 100 caractères.');
      } else if (insurancePrefix.length > 10) {
        throw new Error('Le préfixe ne doit pas dépasser 10 caractères.');
      } else if (insuranceTelephone.length > 15) {
        throw new Error(
          'Le numéro de téléphone ne doit pas dépasser 15 caractères.'
        );
      } else if (!/^\d+$/.test(insuranceTelephone)) {
        throw new Error('Le numéro de téléphone doit être un nombre valide.');
      } else {
        return handleInsuranceOrganismCreationAsAdmin(formData);
      }
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
        "Une erreur est survenue lors de la création de l'organisme d'assurance.";
      console.error('Error creating insurance:', errorMessage);
    },
  });
};
