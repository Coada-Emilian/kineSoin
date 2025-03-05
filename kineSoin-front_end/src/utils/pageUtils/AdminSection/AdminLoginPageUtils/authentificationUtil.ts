import { NavigateFunction } from 'react-router-dom';
import { setAdminTokenAndDataInLocalStorage } from '../../../../localStorage/adminLocalStorage';
import { handleAdminLogin } from '../../../apiUtils/publicApiUtils';

interface AuthentificationUtilsProps {
  setAdminProfileToken: React.Dispatch<React.SetStateAction<string | null>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  navigate: NavigateFunction;
}

export const checkAdminCredentials = async (
  e: React.FormEvent<HTMLFormElement>,
  {
    setAdminProfileToken,
    setErrorMessage,
    navigate,
  }: AuthentificationUtilsProps
) => {
  e.preventDefault();
  try {
    const formData = new FormData(e.currentTarget);
    const adminEmail = formData.get('email') as string;
    const adminPassword = formData.get('password') as string;

    if (!adminEmail || !adminPassword) {
      setErrorMessage('Veuillez remplir tous les champs');
      return;
    } else if (!adminEmail.includes('@')) {
      setErrorMessage('Veuillez entrer une adresse email valide');
      return;
    }

    const response = await handleAdminLogin(adminEmail, adminPassword);
    if (response) {
      setAdminTokenAndDataInLocalStorage(
        response.token,
        response.name,
        response.id
      );
      setAdminProfileToken(response.token);
    } else {
      setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
    }
  } catch (error) {
    setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
  }
};
