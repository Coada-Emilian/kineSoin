import { setAdminTokenAndDataInLocalStorage } from '../../../../localStorage/adminLocalStorage';
import { handleAdminLogin } from '../../../apiUtils/publicApiUtils/handleAdminLogin';

export const checkAdminCredentials = async (
  adminEmail: string,
  adminPassword: string
) => {
  try {
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
