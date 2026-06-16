import { useMutation } from '@tanstack/react-query';
import { handlePatientLogin } from '../../functions/apiUtils/public/handlePatientLogin';
import { validateLoginForm } from './validators/validateLoginForm';

export const usePatientLoginMutation = (
  setPatientProfileToken: (token: string) => void,
  navigate: (path: string) => void
) => {
  return useMutation({
    mutationKey: ['patientLogin'],
    mutationFn: async (formData: FormData) => {
      const patientEmail = formData.get('email') as string;

      const patientPassword = formData.get('password') as string;

      validateLoginForm(patientEmail, patientPassword);

      return handlePatientLogin(patientEmail, patientPassword);
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
