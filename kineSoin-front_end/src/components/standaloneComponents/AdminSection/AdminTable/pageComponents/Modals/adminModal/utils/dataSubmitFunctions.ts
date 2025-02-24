import {
  handleAfflictionCreationAsAdmin,
  handleInsuranceOrganismCreationAsAdmin,
  handleMedicCreationAsAdmin,
} from '../../../../../../../../utils/apiUtils/adminApiUtils';

interface DataSubmitFunctionsProps {
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  setIsAddAfflictionModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAddMedicModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAddInsuranceModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const handleAfflictionSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  { setErrorMessage, setIsAddAfflictionModalOpen }: DataSubmitFunctionsProps
) => {
  e.preventDefault();
  try {
    const formData = new FormData(e.currentTarget);
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
      setErrorMessage('Veuillez remplir tous les champs.');
      return;
    } else if (afflictionName.length > 50) {
      setErrorMessage('Le nom ne doit pas dépasser 50 caractères.');
      return;
    } else if (afflictionDescription.length > 500) {
      setErrorMessage('La description ne doit pas dépasser 500 caractères.');
      return;
    } else if (afflictionInsuranceCode.length > 10) {
      setErrorMessage(
        "Le code d'assurance ne doit pas dépasser 10 caractères."
      );
      return;
    } else if (!/^\d+$/.test(afflictionBodyRegionId)) {
      setErrorMessage(
        "L'ID de la région corporelle doit être un nombre valide."
      );
      return;
    } else if (!/^[0-9A-Za-z]{1,10}$/.test(afflictionInsuranceCode)) {
      setErrorMessage(
        "Le code d'assurance doit être un code valide (chiffres et/ou lettres)."
      );
      return;
    } else if (!['true', 'false'].includes(afflictionOperatedStatus)) {
      setErrorMessage("Le statut opéré doit être 'true' ou 'false'.");
      return;
    }

    const response = await handleAfflictionCreationAsAdmin(formData);
    if (response) {
      setIsAddAfflictionModalOpen && setIsAddAfflictionModalOpen(false);
      window.location.reload();
    } else {
      setErrorMessage(
        "Une erreur est survenue lors de la création de l'affliction."
      );
    }
  } catch (error) {
    console.error('Error updating affliction:', error);
  }
};

export const handleMedicSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  { setErrorMessage, setIsAddMedicModalOpen }: DataSubmitFunctionsProps
) => {
  e.preventDefault();
  try {
    const formData = new FormData(e.currentTarget);
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
      setErrorMessage('Veuillez remplir tous les champs.');
      return;
    } else if (medicName.length > 50) {
      setErrorMessage('Le nom ne doit pas dépasser 50 caractères.');
      return;
    } else if (medicSurname.length > 50) {
      setErrorMessage('Le prénom ne doit pas dépasser 50 caractères.');
      return;
    } else if (medicLicenceCode.length > 9) {
      setErrorMessage('Le code ADELI ne doit pas dépasser 9 caractères.');
      return;
    } else if (medicStreetNumber.length > 10) {
      setErrorMessage('Le numéro de rue ne doit pas dépasser 10 caractères.');
      return;
    } else if (medicStreetName.length > 50) {
      setErrorMessage('Le nom de rue ne doit pas dépasser 50 caractères.');
      return;
    } else if (medicPostalCode.length > 10) {
      setErrorMessage('Le code postal ne doit pas dépasser 10 caractères.');
      return;
    } else if (medicCity.length > 100) {
      setErrorMessage('La ville ne doit pas dépasser 100 caractères.');
      return;
    } else if (medicPrefix.length > 10) {
      setErrorMessage('Le préfixe ne doit pas dépasser 10 caractères.');
      return;
    } else if (medicTelephone.length > 15) {
      setErrorMessage(
        'Le numéro de téléphone ne doit pas dépasser 15 caractères.'
      );
      return;
    } else if (!/^\d+$/.test(medicTelephone)) {
      setErrorMessage(
        'Le numéro de téléphone ne doit contenir que des chiffres.'
      );
      return;
    } else {
      formData.append('full_phone_number', medicFullTelephone);

      const response = await handleMedicCreationAsAdmin(formData);
      if (response) {
        setIsAddMedicModalOpen && setIsAddMedicModalOpen(false);
        window.location.reload();
      } else {
        setErrorMessage(
          'Une erreur est survenue lors de la création du compte.'
        );
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export const handleInsuranceSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  { setErrorMessage, setIsAddInsuranceModalOpen }: DataSubmitFunctionsProps
) => {
  e.preventDefault();
  try {
    const formData = new FormData(e.currentTarget);
    for (const pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
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
      setErrorMessage('Veuillez remplir tous les champs.');
      return;
    } else if (insuranceName.length > 50) {
      setErrorMessage('Le nom ne doit pas dépasser 50 caractères.');
      return;
    } else if (insuranceLicenceCode.length > 10) {
      setErrorMessage(
        "Le code d'assurance ne doit pas dépasser 10 caractères."
      );
      return;
    } else if (insuranceStreetNumber.length > 10) {
      setErrorMessage('Le numéro de rue ne doit pas dépasser 10 caractères.');
      return;
    } else if (insuranceStreetName.length > 50) {
      setErrorMessage('Le nom de rue ne doit pas dépasser 50 caractères.');
      return;
    } else if (insurancePostalCode.length > 10) {
      setErrorMessage('Le code postal ne doit pas dépasser 10 caractères.');
      return;
    } else if (insuranceCity.length > 100) {
      setErrorMessage('La ville ne doit pas dépasser 100 caractères.');
      return;
    } else if (insurancePrefix.length > 10) {
      setErrorMessage('Le préfixe ne doit pas dépasser 10 caractères.');
      return;
    } else if (insuranceTelephone.length > 15) {
      setErrorMessage(
        'Le numéro de téléphone ne doit pas dépasser 15 caractères.'
      );
      return;
    } else if (!/^\d+$/.test(insuranceTelephone)) {
      setErrorMessage(
        'Le numéro de téléphone ne doit contenir que des chiffres.'
      );
      return;
    } else {
      formData.append('full_phone_number', insuranceFullTelephone);

      const response = await handleInsuranceOrganismCreationAsAdmin(formData);
      if (response) {
        setIsAddInsuranceModalOpen && setIsAddInsuranceModalOpen(false);
        window.location.reload();
      } else {
        setErrorMessage(
          'Une erreur est survenue lors de la création du compte.'
        );
      }
    }
  } catch (error) {
    console.error(error);
  }
};
