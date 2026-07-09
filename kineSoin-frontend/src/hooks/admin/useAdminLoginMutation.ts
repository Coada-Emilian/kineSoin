import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import type { UserLoginMutationProps } from '../../@types/props/mutationProps';
import { handleAdminLogin } from '../../api/admin/handleAdminLogin';
import axios from '../../axios';
import { validateLoginForm } from '../validateLoginForm';

export const useAdminLoginMutation = ({
  setUser,
  setAccessToken,
}: UserLoginMutationProps) => {
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
