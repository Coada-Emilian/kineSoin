import { useMutation } from '@tanstack/react-query';
import type { IPatientRegistrationFormData } from '../../../@types/interfaces/formInterfaces';
import { handlePatientRegistration } from '../../functions/apiUtils/public/handlePatientRegistration';

export const usePatientRegistrationMutation = () => {
  return useMutation({
    mutationKey: ['patientRegister'],
    mutationFn: async (sentPatientData: IPatientRegistrationFormData) => {
      const formData = new FormData();

      if (sentPatientData) {
        Object.entries(sentPatientData).forEach(([key, value]) => {
          formData.append(key, value as string | Blob);
        });
      }

      return handlePatientRegistration(formData);
    },
    onSuccess: () => {
      console.log('Patient registered successfully');
    },
    // onError: (error: Error) => {
    //   throw new Error(error.message);
    // },
  });
};
