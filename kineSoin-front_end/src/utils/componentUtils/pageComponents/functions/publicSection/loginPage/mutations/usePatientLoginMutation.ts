import { useMutation } from '@tanstack/react-query';
import { handlePatientLogin } from '../../../../../../apiUtils/publicApiUtils';

export const usePatientLoginMutation = (
  setPatientProfileToken: (token: string) => void,
  navigate: (path: string) => void
) => {
  return useMutation({
    mutationKey: ['patientLogin'],
    mutationFn: async (formData: FormData) => {
      const patientLoginEmail = formData.get('email') as string;

      const patientLoginPassword = formData.get('password') as string;

      if (!patientLoginEmail || !patientLoginPassword) {
        throw new Error('Veuillez remplir tous les champs');
      } else if (
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
          patientLoginEmail
        )
      ) {
        throw new Error('Veuillez entrer une adresse email valide');
      }

      return handlePatientLogin(patientLoginEmail, patientLoginPassword);
    },
    onSuccess: (data) => {
      setPatientProfileToken(data);
      navigate('/patient/dashboard');
    },
    onError: (error: Error) => {
      throw new Error(error.message);
    },
  });
};
