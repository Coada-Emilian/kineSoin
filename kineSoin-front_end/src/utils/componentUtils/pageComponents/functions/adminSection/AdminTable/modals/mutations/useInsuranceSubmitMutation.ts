import { useMutation } from '@tanstack/react-query';
import { handleInsuranceOrganismCreationAsAdmin } from '../../../../../../../apiUtils/adminApiUtils/adminInsuranceApiUtils';

export const useSubmitInsuranceMutation = (
  onClose: () => void,
  setError: (msg: string) => void
) => {
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
      const insuranceFullTelephone = `${insurancePrefix}${insuranceTelephone}`;

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
        setError('Veuillez remplir tous les champs.');
        return;
      } else if (insuranceName.length > 50) {
        setError('Le nom ne doit pas dépasser 50 caractères.');
        return;
      } else if (insuranceLicenceCode.length > 10) {
        setError("Le code d'assurance ne doit pas dépasser 10 caractères.");
        return;
      } else if (insuranceStreetNumber.length > 10) {
        setError('Le numéro de rue ne doit pas dépasser 10 caractères.');
        return;
      } else if (insuranceStreetName.length > 50) {
        setError('Le nom de rue ne doit pas dépasser 50 caractères.');
        return;
      } else if (insurancePostalCode.length > 10) {
        setError('Le code postal ne doit pas dépasser 10 caractères.');
        return;
      } else if (insuranceCity.length > 100) {
        setError('La ville ne doit pas dépasser 100 caractères.');
        return;
      } else if (insurancePrefix.length > 10) {
        setError('Le préfixe ne doit pas dépasser 10 caractères.');
        return;
      } else if (insuranceTelephone.length > 15) {
        setError('Le numéro de téléphone ne doit pas dépasser 15 caractères.');
        return;
      } else if (!/^\d+$/.test(insuranceTelephone)) {
        setError('Le numéro de téléphone doit être un nombre valide.');
        return;
      } else {
        formData.append('full_phone_number', insuranceFullTelephone);
      }

      return handleInsuranceOrganismCreationAsAdmin(formData);
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
      setError(errorMessage);
    },
  });
};
