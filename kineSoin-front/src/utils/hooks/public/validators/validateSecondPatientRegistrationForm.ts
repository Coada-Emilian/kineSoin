export const validateSecondPatientRegistrationForm = (formData: FormData) => {
  const patientPostalCode = formData.get('postal_code') as string;
  const patientCity = formData.get('city') as string;
  const patientStreetNumber = formData.get('street_number') as string;
  const patientStreetName = formData.get('street_name') as string;
  const patientPhoneNumber = formData.get('phone_number') as string;
  const patientPrefix = formData.get('prefix') as string;

  if (
    !patientPostalCode ||
    !patientCity ||
    !patientStreetNumber ||
    !patientStreetName ||
    !patientPhoneNumber ||
    !patientPrefix
  ) {
    throw new Error('Veuillez remplir tous les champs');
  } else if (!/^\d{5}$/.test(patientPostalCode)) {
    throw new Error('Veuillez entrer un code postal valide');
  } else if (!/^[A-Za-zÀ-ÿ\s'-]+$/.test(patientCity)) {
    throw new Error('Veuillez entrer un nom de ville valide');
  } else if (!/^\d+$/.test(patientStreetNumber)) {
    throw new Error('Veuillez entrer un numéro de rue valide');
  } else if (!/^[A-Za-zÀ-ÿ\s'-]+$/.test(patientStreetName)) {
    throw new Error('Veuillez entrer un nom de rue valide');
  } else if (!/^\+?\d{1,15}$/.test(patientPhoneNumber)) {
    throw new Error(
      "Veuillez entrer un numéro de téléphone valide (+ et jusqu'à 15 chiffres)"
    );
  }
  return true;
};
