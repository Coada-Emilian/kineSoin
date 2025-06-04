import { IRegisterFormUtilsProps } from '../../../../../@types/interfaces/customInterfaces';

// Patient registration function for the second form
export const handleSecondPatientRegisterForm = async (
  e: React.FormEvent<HTMLFormElement>,
  {
    setError,
    setFormOrder,
    setSentPatientData,
    sentPatientData,
  }: IRegisterFormUtilsProps
) => {
  try {
    e.preventDefault();

    // Retrieve the form data
    const form = e.currentTarget;
    const formData = new FormData(form);
    const patientPostalCode = formData.get('postal_code') as string;
    const patientCity = formData.get('city') as string;
    const patientStreetNumber = formData.get('street_number') as string;
    const patientStreetName = formData.get('street_name') as string;
    const patientPhoneNumber = formData.get('phone_number') as string;
    const patientPrefix = formData.get('prefix') as string;

    console.log('Patient data:', {
      patientPostalCode,
      patientCity,
      patientStreetNumber,
      patientStreetName,
      patientPhoneNumber,
      patientPrefix,
    });

    // Check if the postal code, city, street number, street name and phone number fields are empty
    if (
      !patientPostalCode ||
      !patientCity ||
      !patientStreetNumber ||
      !patientStreetName ||
      !patientPhoneNumber ||
      !patientPrefix
    ) {
      setError('Veuillez remplir tous les champs');
    } else if (!/^\d{5}$/.test(patientPostalCode)) {
      setError('Veuillez entrer un code postal valide');
      return;
    } else if (!/^[A-Za-zÀ-ÿ\s'-]+$/.test(patientCity)) {
      setError('Veuillez entrer un nom de ville valide');
      return;
    } else if (!/^\d+$/.test(patientStreetNumber)) {
      setError('Veuillez entrer un numéro de rue valide');
      return;
    } else if (!/^[A-Za-zÀ-ÿ\s'-]+$/.test(patientStreetName)) {
      setError('Veuillez entrer un nom de rue valide');
      return;
    } else if (!/^\+?\d{1,15}$/.test(patientPhoneNumber)) {
      setError(
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
      setError('');
      // Set the sent patient data with the form data
      setSentPatientData &&
        setSentPatientData({ ...sentPatientData, ...sentData });

      if (setFormOrder) {
        setFormOrder('third');
      }
    }
  } catch (error) {
    console.error(error);
    setError('Une erreur est survenue. Veuillez réessayer.');
  }
};
