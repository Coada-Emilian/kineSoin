import { IRegisterFormUtilsProps } from '../../../../../@types/interfaces/customInterfaces';

// Patient registration function for the first form
export const handleFirstPatientRegisterForm = async (
  e: React.FormEvent<HTMLFormElement>,
  { setError, setFormOrder, setSentPatientData }: IRegisterFormUtilsProps
) => {
  try {
    e.preventDefault();

    // Retrieve the form data, the current date and year
    const form = e.currentTarget;

    const formData = new FormData(form);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const nameRegex = /^[A-Za-zÀ-ÿ\s'-]+$/;

    const patientName = formData.get('name') as string;
    const patientBirthName = formData.get('birth_name') as string;
    const patientSurname = formData.get('surname') as string;
    const patientBirthDate = formData.get('birth_date') as string;
    const patientGender = formData.get('gender') as string;


    // Check if the name, birth name and surname fields are empty
    if (
      !patientName ||
      !patientBirthName ||
      !patientSurname ||
      !patientBirthDate ||
      !patientGender
    ) {
      setError('Veuillez remplir tous les champs');
      return;
    } else if (patientBirthDate > currentDate.toISOString().split('T')[0]) {
      setError('Veuillez entrer une date valide');

      return;
    } else if (patientBirthDate < '1900-01-01') {
      setError('Veuillez entrer une date de naissance valide (après 1900)');
      return;
    } else if (
      !nameRegex.test(patientName as string) ||
      !nameRegex.test(patientBirthName as string) ||
      !nameRegex.test(patientSurname as string)
    ) {
      setError(
        'Le nom, le prénom et le nom de naissance ne doivent contenir que des lettres.'
      );
      return;
    }
    // Check if the patient is under 12 years old
    else {
      const age = currentYear - Number(patientBirthDate.split('-')[0]);
      if (age < 12) {
        setError('Vous devez avoir au moins 12 ans pour vous inscrire');
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
    setError('');
    // Set the sent patient data with the form data
    if (setSentPatientData) {
      setSentPatientData(sentData);
    }
    if (setFormOrder) {
      setFormOrder('second');
    }
  } catch (error) {
    setError('Une erreur est survenue. Veuillez réessayer.');
    console.error(error);
  }
};
