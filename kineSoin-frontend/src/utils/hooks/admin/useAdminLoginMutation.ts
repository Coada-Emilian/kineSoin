import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { setAdminTokenAndDataInLocalStorage } from '../../localStorageUtils/adminLocalStorage';
import { validateLoginForm } from '../validateLoginForm';
import { handleAdminLogin } from '../../api/admin/handleAdminLogin';

export const useAdminLoginMutation = (
  setAdminProfileToken: (token: string) => void,
  setIsAdminAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ['adminLogin'],
    mutationFn: async (formData: FormData) => {
      const adminEmail = formData.get('email') as string;

      const adminPassword = formData.get('password') as string;

      validateLoginForm(adminEmail, adminPassword);

      const response = await handleAdminLogin(adminEmail, adminPassword);

      if (!response) {
        throw new Error('Identifiants incorrects. Veuillez réessayer.');
      } else {
        navigate('/admin/therapists');

        return response;
      }
    },
    onSuccess: (response) => {
      console.log('Admin authenticated successfully');
      setAdminProfileToken(response.token);
      setIsAdminAuthenticated(true);
      setAdminTokenAndDataInLocalStorage(
        response.token,
        response.name,
        response.id
      );
    },
    onError: (error: Error) => {
      throw new Error(error.message);
    },
  });
};
