import { useMutation } from '@tanstack/react-query';
import { handlePatientRegistration } from '../../../apiUtils/publicApiUtils/handlePatientRegistration';

export const usePatientRegisterMutation = () => {
  return useMutation({
    mutationKey: ['patientRegister'],
    mutationFn: async (sentPatientData: {}) => {
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
  });
};
