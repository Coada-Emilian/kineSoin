import { handleTherapistConnection } from '../../../../../utils/apiUtils/patientApiUtils';
import { handlePatientLogin } from '../../../../../utils/apiUtils/publicApiUtils';

interface AuthentificationUtilsProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  setPatientProfileToken?: React.Dispatch<React.SetStateAction<string | null>>;
  navigate: (path: string) => void;

  setTherapistProfileToken?: React.Dispatch<
    React.SetStateAction<string | null>
  >;
}

// Function to check the patient credentials
export const checkPatientCredentials = async (
  e: React.FormEvent<HTMLFormElement>,
  {
    setIsLoading,
    setErrorMessage,
    setPatientProfileToken,
    navigate,
  }: AuthentificationUtilsProps
) => {
  e.preventDefault();
  try {
    setIsLoading(true);
    setErrorMessage('');
    const formData = new FormData(e.currentTarget);
    const patientLoginEmail = formData.get('email') as string;
    const patientLoginPassword = formData.get('password') as string;

    // Check if the email and password fields are empty
    if (!patientLoginEmail || !patientLoginPassword) {
      setIsLoading(false);
      setErrorMessage('Veuillez remplir tous les champs');
      return;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        patientLoginEmail as string
      )
    ) {
      setIsLoading(false);
      setErrorMessage('Veuillez entrer une adresse email valide');
      return;
    }

    // Call the handlePatientConnection function from the apiUtils file
    const response = await handlePatientLogin(
      patientLoginEmail,
      patientLoginPassword
    );

    // If the response is true, set the patient profile token
    if (response) {
      if (setPatientProfileToken) {
        setPatientProfileToken(response);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setErrorMessage('Email et/ou Mot de passe invalide');
      }
      navigate('/patient/dashboard');
    } else {
      setIsLoading(false);
      setErrorMessage('Email et/ou Mot de passe invalide');
    }
  } catch (error) {
    setIsLoading(false);
    setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
    console.error(error);
  }
};

// Therapist login function
export const checkTherapistCredentials = async (
  e: React.FormEvent<HTMLFormElement>,
  {
    setIsLoading,
    setErrorMessage,
    setTherapistProfileToken,
    navigate,
  }: AuthentificationUtilsProps
) => {
  e.preventDefault();
  try {
    setIsLoading(true);
    setErrorMessage('');
    const formData = new FormData(e.currentTarget);
    const therapistLoginEmail = formData.get('email') as string;
    const therapistLoginPassword = formData.get('password') as string;

    // Check if the email and password fields are empty
    if (!therapistLoginEmail || !therapistLoginPassword) {
      setIsLoading(false);
      setErrorMessage('Veuillez remplir tous les champs');
      return;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        therapistLoginEmail
      )
    ) {
      setIsLoading(false);
      setErrorMessage('Veuillez entrer une adresse email valide');
      return;
    }

    // Call the handleTherapistConnection function from the apiUtils file
    const response = await handleTherapistConnection(
      therapistLoginEmail,
      therapistLoginPassword
    );

    // If the response is true, set the therapist profile token
    if (response) {
      if (setTherapistProfileToken) {
        setTherapistProfileToken(response);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setErrorMessage('Email et/ou Mot de passe invalide');
      }
      navigate('/therapist/dashboard');
    } else {
      setIsLoading(false);
      setErrorMessage('Email et/ou Mot de passe invalide');
    }
  } catch (error) {
    setIsLoading(false);
    setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
    console.error(error);
  }
};
