import { NavigateFunction, useNavigate } from 'react-router-dom';
import { setAdminTokenAndDataInLocalStorage } from '../../../../localStorage/adminLocalStorage';
import { handleAdminLogin } from '../../../../utils/apiUtils/publicApiUtils';

interface AuthentificationUtilsProps {
  setAdminProfileToken: React.Dispatch<React.SetStateAction<string | null>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  navigate: NavigateFunction;
}

export const checkAdminCredentials = async (
  e: React.FormEvent<HTMLFormElement>,
  {
    setAdminProfileToken,
    setErrorMessage,
    setIsLoading,
    navigate,
  }: AuthentificationUtilsProps
) => {
  e.preventDefault();
  setIsLoading(true);
  try {
    const formData = new FormData(e.currentTarget);
    const adminEmail = formData.get('email') as string;
    const adminPassword = formData.get('password') as string;

    if (!adminEmail || !adminPassword) {
      setIsLoading(false);
      setErrorMessage('Veuillez remplir tous les champs');
      return;
    } else if (!adminEmail.includes('@')) {
      setIsLoading(false);
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
    navigate('/admin/therapists');
  } catch (error) {
    setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
  } finally {
    setIsLoading(false);
  }
};
