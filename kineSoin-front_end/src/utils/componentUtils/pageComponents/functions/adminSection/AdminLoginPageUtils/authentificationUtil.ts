import { setAdminTokenAndDataInLocalStorage } from '../../../../../../localStorage/adminLocalStorage';
import { handleAdminLogin } from '../../../../../apiUtils/publicApiUtils';

export const checkAdminCredentials = async (
  adminEmail: string,
  adminPassword: string
) => {
  try {
    if (!adminEmail || !adminPassword) {
      throw 'Veuillez remplir tous les champs';
    } else if (!adminEmail.includes('@')) {
      throw 'Veuillez entrer une adresse email valide';
    }

    const response = await handleAdminLogin(adminEmail, adminPassword);
    if (response) {
      setAdminTokenAndDataInLocalStorage(
        response.token,
        response.name,
        response.id
      );
      return response.token;
    } else {
      throw 'Une erreur est survenue. Veuillez réessayer.';
    }
  } catch (error) {
    throw 'Une erreur est survenue. Veuillez réessayer.';
  }
};
