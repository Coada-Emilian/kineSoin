import { setAdminTokenAndDataInLocalStorage } from '../../../../localStorage/adminLocalStorage';
import { handleAdminLogin } from '../../../apiUtils/publicApiUtils';

interface AuthentificationUtilsProps {
  setAdminProfileToken: React.Dispatch<React.SetStateAction<string | null>>;
  setError: (message: string | null) => void;
}

export const checkAdminCredentials = async (
  e: React.FormEvent<HTMLFormElement>,
  { setAdminProfileToken, setError }: AuthentificationUtilsProps
) => {
  e.preventDefault();
  try {
    const formData = new FormData(e.currentTarget);
    const adminEmail = formData.get('email') as string;
    const adminPassword = formData.get('password') as string;

    if (!adminEmail || !adminPassword) {
      setError('Veuillez remplir tous les champs');
      return;
    } else if (!adminEmail.includes('@')) {
      setError('Veuillez entrer une adresse email valide');
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
      setError('Une erreur est survenue. Veuillez réessayer.');
    }
  } catch (error) {
    setError('Une erreur est survenue. Veuillez réessayer.');
  }
};
