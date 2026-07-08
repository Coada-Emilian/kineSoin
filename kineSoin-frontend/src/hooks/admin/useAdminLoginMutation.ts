import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { handleAdminLogin } from '../../api/admin/handleAdminLogin';
import axios from '../../axios';
import { validateLoginForm } from '../validateLoginForm';
import type { AuthenticatedUser } from '../../@types/interfaces/contextInterfaces';

export const useAdminLoginMutation = (
  setUser: (user: AuthenticatedUser) => void,
  setAccessToken: (token: string) => void
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

      setUser(response.user);

      setAccessToken(response.token);

      axios.defaults.headers.common.Authorization = `Bearer ${response.token}`;
    },
    onError: (error: Error) => {
      throw new Error(error.message);
    },
  });
};
