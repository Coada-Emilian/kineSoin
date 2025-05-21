import { useMutation } from '@tanstack/react-query';
import { handleTherapistLogin } from '../../../apiUtils/publicApiUtils/publicApiUtils';

export const useTherapistLoginMutation = (
  setTherapistProfileToken: (token: string) => void,
  navigate: (path: string) => void
) => {
  return useMutation({
    mutationKey: ['therapistLogin'],
    mutationFn: async (formData: FormData) => {
      const therapistLoginEmail = formData.get('email') as string;
      const therapistLoginPassword = formData.get('password') as string;

      if (!therapistLoginEmail || !therapistLoginPassword) {
        throw new Error('Veuillez remplir tous les champs');
      } else if (
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
          therapistLoginEmail
        )
      ) {
        throw new Error('Veuillez entrer une adresse email valide');
      }

      return handleTherapistLogin(therapistLoginEmail, therapistLoginPassword);
    },
    onSuccess: (data) => {
      setTherapistProfileToken(data);
      navigate('/therapist/dashboard');
    },
  });
};
