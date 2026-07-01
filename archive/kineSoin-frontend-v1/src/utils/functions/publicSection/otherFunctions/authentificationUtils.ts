import { NavigateFunction } from 'react-router-dom';
import { handleTherapistConnection } from '../../../apiUtils/patientApiUtils/patientApiUtils';
import { handlePatientLogin } from '../../../apiUtils/publicApiUtils';

interface AuthentificationUtilsProps {
  setError: (message: string | null) => void;
  setPatientProfileToken?: React.Dispatch<React.SetStateAction<string | null>>;
  navigate: NavigateFunction;
  setTherapistProfileToken?: React.Dispatch<
    React.SetStateAction<string | null>
  >;
}

// Function to check the patient credentials
export const checkPatientCredentials = async (
  e: React.FormEvent<HTMLFormElement>,
  { setError, setPatientProfileToken, navigate }: AuthentificationUtilsProps
) => {
  e.preventDefault();
  try {
    setError('');
    const formData = new FormData(e.currentTarget);
    const patientLoginEmail = formData.get('email') as string;
    const patientLoginPassword = formData.get('password') as string;

    // Check if the email and password fields are empty
    if (!patientLoginEmail || !patientLoginPassword) {
      setError('Veuillez remplir tous les champs');
      return;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        patientLoginEmail as string
      )
    ) {
      setError('Veuillez entrer une adresse email valide');
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
      } else {
        setError('Email et/ou Mot de passe invalide');
      }
      navigate('/patient/dashboard');
    } else {
      setError('Email et/ou Mot de passe invalide');
    }
  } catch (error) {
    setError('Une erreur est survenue. Veuillez réessayer.');
    console.error(error);
  }
};

// Therapist login function
export const checkTherapistCredentials = async (
  e: React.FormEvent<HTMLFormElement>,
  { setError, setTherapistProfileToken, navigate }: AuthentificationUtilsProps
) => {
  e.preventDefault();
  try {
    setError('');
    const formData = new FormData(e.currentTarget);
    const therapistLoginEmail = formData.get('email') as string;
    const therapistLoginPassword = formData.get('password') as string;

    // Check if the email and password fields are empty
    if (!therapistLoginEmail || !therapistLoginPassword) {
      setError('Veuillez remplir tous les champs');
      return;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        therapistLoginEmail
      )
    ) {
      setError('Veuillez entrer une adresse email valide');
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
      } else {
        setError('Email et/ou Mot de passe invalide');
      }
      navigate('/therapist/dashboard');
    } else {
      setError('Email et/ou Mot de passe invalide');
    }
  } catch (error) {
    setError('Une erreur est survenue. Veuillez réessayer.');
    console.error(error);
  }
};
