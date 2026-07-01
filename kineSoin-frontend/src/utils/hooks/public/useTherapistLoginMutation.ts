import { useMutation } from '@tanstack/react-query';
import { handleTherapistLogin } from '../../api/public/handleTherapistLogin';
import { validateLoginForm } from '../validateLoginForm';

export const useTherapistLoginMutation = (
  setTherapistProfileToken: (token: string) => void,
  navigate: (path: string) => void
) => {
  return useMutation({
    mutationKey: ['therapistLogin'],
    mutationFn: async (formData: FormData) => {
      const therapistEmail = formData.get('email') as string;
      const therapistPassword = formData.get('password') as string;

      validateLoginForm(therapistEmail, therapistPassword);

      return handleTherapistLogin(therapistEmail, therapistPassword);
    },
    onSuccess: (data) => {
      setTherapistProfileToken(data);
      navigate('/therapist/dashboard');
    },
    onError: (error: Error) => {
      throw new Error(error.message);
    },
  });
};
