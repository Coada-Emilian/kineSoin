import { useMutation } from '@tanstack/react-query';
import { handleTherapistLogin } from '../../../apiUtils/publicApiUtils';
import { validateTherapistLoginForm } from './validations/validateTherapistLoginForm';

export const useTherapistLoginMutation = (
  setTherapistProfileToken: (token: string) => void,
  navigate: (path: string) => void
) => {
  return useMutation({
    mutationKey: ['therapistLogin'],
    mutationFn: async (formData: FormData) => {
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;

      validateTherapistLoginForm(email, password);

      return handleTherapistLogin(email, password);
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
