import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import type { UserLoginMutationProps } from '../../@types/props/mutationProps';
import { handleTherapistLogin } from '../../api/public/handleTherapistLogin';
import axios from '../../axios';
import { validateLoginForm } from '../validateLoginForm';

export const useTherapistLoginMutation = ({
  setUser,
  setAccessToken,
}: UserLoginMutationProps) => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['therapistLogin'],
    mutationFn: async (formData: FormData) => {
      const therapistEmail = formData.get('email') as string;

      const therapistPassword = formData.get('password') as string;

      validateLoginForm(therapistEmail, therapistPassword);

      const response = await handleTherapistLogin(
        therapistEmail,
        therapistPassword
      );

      if (!response) {
        throw new Error('Identifiants incorrects. Veuillez réessayer.');
      } else {
        navigate('/therapist/dashboard');

        return response;
      }
    },
    onSuccess: (response) => {
      console.log('Therapist authenticated successfully');

      setUser(response.user);

      setAccessToken(response.token);

      axios.defaults.headers.common.Authorization = `Bearer ${response.token}`;
    },
    onError: (error: Error) => {
      throw new Error(error.message);
    },
  });
};
