import { useMutation } from '@tanstack/react-query';
import { handlePatientLogin } from '../../../../../../apiUtils/publicApiUtils';

export const usePatientLogin = (
  setError: (error: string) => void,
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

      const response = await handlePatientLogin(
        patientLoginEmail,
        patientLoginPassword
      );

      if (response) {
        setPatientProfileToken(response);
        navigate('/patient/dashboard');
      } else {
        setError('Email et/ou Mot de passe invalide');
      }
    },
    onSuccess: () => {
      navigate('/patient/dashboard');
    },
  });
};
