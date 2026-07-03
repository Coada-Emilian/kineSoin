import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { handleTherapistLogin } from '../../api/public/handleTherapistLogin';
import { setTherapistTokenAndDataInLocalStorage } from '../../utils/localStorage/therapistLocalStorage';
import { validateLoginForm } from '../validateLoginForm';

export const useTherapistLoginMutation = (
  setTherapistProfileToken: (token: string) => void,
  setIsTherapistAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
) => {
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
      setTherapistProfileToken(response.token);
      setIsTherapistAuthenticated(true);
      setTherapistTokenAndDataInLocalStorage(
        response.token,
        response.fullName,
        response.picture_url,
        response.id.toString()
      );
    },
    onError: (error: Error) => {
      throw new Error(error.message);
    },
  });
};
