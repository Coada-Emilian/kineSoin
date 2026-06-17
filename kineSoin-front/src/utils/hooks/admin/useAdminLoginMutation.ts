import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { handleAdminLogin } from '../../functions/apiUtils/admin/handleAdminLogin';
import { validateLoginForm } from '../validateLoginForm';

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
        return response.token;
      }
    },
    onSuccess: (token) => {
      console.log('Admin authenticated successfully');
      setAdminProfileToken(token);
      setIsAdminAuthenticated(true);
    },
    onError: (error: Error) => {
      throw new Error(error.message);
    },
  });
};
