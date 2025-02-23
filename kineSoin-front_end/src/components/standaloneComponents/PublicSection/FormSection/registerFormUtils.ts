interface RegisterFormUtilsProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  setIsFirstFormValidated: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSecondFormValidated: React.Dispatch<React.SetStateAction<boolean>>;
  setIsThirdFormValidated: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPatientRegisterPageRendered?: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setSentPatientData: React.Dispatch<
    React.SetStateAction<Record<string, string | Blob>>
  >;
  patientImage?: Blob | null;
  sentPatientData?: Record<string, string | Blob>;
}

// Patient registration function for the first form
export const handleFirstPatientRegisterForm = async (
  e: React.FormEvent<HTMLFormElement>,
  {
    setIsLoading,
    setErrorMessage,
    setIsFirstFormValidated,
    setIsPatientRegisterPageRendered,
    setSentPatientData,
  }: RegisterFormUtilsProps
) => {
  try {
    setIsLoading(true);
    e.preventDefault();
    setErrorMessage('');

    // Retrieve the form data, the current date and year
    const form = e.currentTarget;
    const formData = new FormData(form);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const nameRegex = /^[A-Za-zÀ-ÿ\s'-]+$/;

    const patientName = formData.get('name') as string;
    const patientBirthName = formData.get('birth_name') as string;
    const patientSurname = formData.get('surname') as string;
    const patientBirthDate = formData.get('birth-date') as string;
    const patientGender = formData.get('gender') as string;

    // Check if the name, birth name and surname fields are empty
    if (
      !patientName ||
      !patientBirthName ||
      !patientSurname ||
      !patientBirthDate ||
      !patientGender
    ) {
      setErrorMessage('Veuillez remplir tous les champs');
      return;
    } else if (patientBirthDate > currentDate.toISOString().split('T')[0]) {
      setErrorMessage('Veuillez entrer une date valide');
      return;
    } else if (patientBirthDate < '1900-01-01') {
      setErrorMessage(
        'Veuillez entrer une date de naissance valide (après 1900)'
      );
      return;
    } else if (
      !nameRegex.test(patientName as string) ||
      !nameRegex.test(patientBirthName as string) ||
      !nameRegex.test(patientSurname as string)
    ) {
      setErrorMessage(
        'Le nom, le prénom et le nom de naissance ne doivent contenir que des lettres.'
      );
      return;
    }
    // Check if the patient is under 12 years old
    else {
      const age = currentYear - Number(patientBirthDate.split('-')[0]);
      if (age < 12) {
        setErrorMessage('Vous devez avoir au moins 12 ans pour vous inscrire');
        return;
      }
    }

    // Create an object with the form data
    const sentData = {
      name: patientName,
      birth_name: patientBirthName,
      surname: patientSurname,
      birth_date: patientBirthDate,
      gender: patientGender,
    };

    // Set the patient error message to an empty string
    setErrorMessage('');
    // Set the sent patient data with the form data
    setSentPatientData(sentData);
    // Set the first form as validated and the second form as not validated
    setIsFirstFormValidated(true);
    if (setIsPatientRegisterPageRendered) {
      setIsPatientRegisterPageRendered(false);
    }
    setIsLoading(false);
  } catch (error) {
    setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
    console.error(error);
  }
};

// Patient registration function for the second form
export const handleSecondPatientRegisterForm = async (
  e: React.FormEvent<HTMLFormElement>,
  {
    setIsLoading,
    setErrorMessage,
    setIsFirstFormValidated,
    setIsSecondFormValidated,
    setSentPatientData,
    sentPatientData,
  }: RegisterFormUtilsProps
) => {
  try {
    setIsLoading(true);
    e.preventDefault();
    setErrorMessage('');

    // Retrieve the form data
    const form = e.currentTarget;
    const formData = new FormData(form);
    const patientPostalCode = formData.get('postal_code') as string;
    const patientCity = formData.get('city') as string;
    const patientStreetNumber = formData.get('street_number') as string;
    const patientStreetName = formData.get('street_name') as string;
    const patientPhoneNumber = formData.get('phone_number') as string;
    const patientPrefix = formData.get('prefix') as string;

    // Check if the postal code, city, street number, street name and phone number fields are empty
    if (
      !patientPostalCode ||
      !patientCity ||
      !patientStreetNumber ||
      !patientStreetName ||
      !patientPhoneNumber ||
      !patientPrefix
    ) {
      setErrorMessage('Veuillez remplir tous les champs');
    } else if (!/^\d{5}$/.test(patientPostalCode)) {
      setErrorMessage('Veuillez entrer un code postal valide');
      return;
    } else if (!/^[A-Za-zÀ-ÿ\s'-]+$/.test(patientCity)) {
      setErrorMessage('Veuillez entrer un nom de ville valide');
      return;
    } else if (!/^\d+$/.test(patientStreetNumber)) {
      setErrorMessage('Veuillez entrer un numéro de rue valide');
      return;
    } else if (!/^[A-Za-zÀ-ÿ\s'-]+$/.test(patientStreetName)) {
      setErrorMessage('Veuillez entrer un nom de rue valide');
      return;
    } else if (!/^\+?\d{1,15}$/.test(patientPhoneNumber)) {
      setErrorMessage(
        "Veuillez entrer un numéro de téléphone valide (+ et jusqu'à 15 chiffres)"
      );
      return;
    } else {
      // Create an object with the form data
      const fullPhoneNumber = `${patientPrefix}${patientPhoneNumber}`;
      const sentData = {
        street_number: patientStreetNumber,
        street_name: patientStreetName,
        postal_code: patientPostalCode,
        city: patientCity,
        prefix: patientPrefix,
        phone_number: patientPhoneNumber,
        full_phone_number: fullPhoneNumber,
      };

      // Set the patient error message to an empty string
      setErrorMessage('');
      // Set the sent patient data with the form data
      setSentPatientData({ ...sentPatientData, ...sentData });
      // Set the second form as validated and the third form as not validated
      setIsFirstFormValidated(false);
      setIsSecondFormValidated(true);
      setIsLoading(false);
    }
  } catch (error) {
    console.error(error);
    setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
  }
};

// Patient registration function for the third form
export const handleThirdPatientRegisterForm = async (
  e: React.FormEvent<HTMLFormElement>,
  {
    setIsLoading,
    setErrorMessage,
    setIsSecondFormValidated,
    setIsThirdFormValidated,
    setSentPatientData,
    patientImage,
    sentPatientData,
  }: RegisterFormUtilsProps
) => {
  try {
    setIsLoading(true);
    e.preventDefault();
    setErrorMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const patientEmail = formData.get('email') as string;
    const patientPassword = formData.get('password') as string;
    const patientConfirmPassword = formData.get('confirm-password') as string;

    if (
      !patientImage ||
      !patientEmail ||
      !patientPassword ||
      !patientConfirmPassword
    ) {
      setErrorMessage('Veuillez remplir tous les champs');
      return;
    } else if (patientPassword !== patientConfirmPassword) {
      setErrorMessage('Les mots de passe ne correspondent pas');
      return;
    } else if (patientPassword.length < 12) {
      setErrorMessage('Le mot de passe doit contenir au moins 12 caractères');
      return;
    } else if (
      !/\d/.test(patientPassword) ||
      !/[a-z]/.test(patientPassword) ||
      !/[A-Z]/.test(patientPassword)
    ) {
      setErrorMessage(
        'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule et un chiffre'
      );
      return;
    } else if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(patientEmail)
    ) {
      setErrorMessage('Veuillez entrer une adresse email valide');
      return;
    } else {
      const sentData = {
        email: patientEmail,
        password: patientPassword,
        repeated_password: patientConfirmPassword,
        photo: patientImage,
      };
      setSentPatientData({ ...sentPatientData, ...sentData });
      setIsSecondFormValidated(false);
      setIsThirdFormValidated(true);
      setIsLoading(false);
    }
  } catch (error) {
    console.error(error);
    setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
  }
};

