import { IRegisterFormUtilsProps } from '../../../../../@types/interfaces/customInterfaces';

// Patient registration function for the third form
export const handleThirdPatientRegisterForm = async (
  e: React.FormEvent<HTMLFormElement>,
  {
    setError,
    setFormOrder,
    setSentPatientData,
    patientImage,
    sentPatientData,
  }: IRegisterFormUtilsProps
) => {
  try {
    e.preventDefault();

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
      setError('Veuillez remplir tous les champs');
      return;
    } else if (patientPassword !== patientConfirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    } else if (patientPassword.length < 12) {
      setError('Le mot de passe doit contenir au moins 12 caractères');
      return;
    } else if (
      !/\d/.test(patientPassword) ||
      !/[a-z]/.test(patientPassword) ||
      !/[A-Z]/.test(patientPassword)
    ) {
      setError(
        'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule et un chiffre'
      );
      return;
    } else if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(patientEmail)
    ) {
      setError('Veuillez entrer une adresse email valide');
      return;
    } else {
      const sentData = {
        email: patientEmail,
        password: patientPassword,
        repeated_password: patientConfirmPassword,
        photo: patientImage,
      };
      setSentPatientData &&
        setSentPatientData({ ...sentPatientData, ...sentData });
      setError('');
      if (setFormOrder) {
        setFormOrder('last');
      }
    }
  } catch (error) {
    console.error(error);
    setError('Une erreur est survenue. Veuillez réessayer.');
  }
};
