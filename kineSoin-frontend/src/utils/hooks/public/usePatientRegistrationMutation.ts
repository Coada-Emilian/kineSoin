import { useMutation } from '@tanstack/react-query';
import type { IPatientRegistrationFormData } from '../../../@types/interfaces/formInterfaces';
import { handlePatientRegistration } from '../../functions/apiUtils/public/handlePatientRegistration';
import { validateFinalPatientRegistrationForm } from './validators/validateFinalPatientRegistrationForm';

export const usePatientRegistrationMutation = () => {
  return useMutation({
    mutationKey: ['patientRegister'],
    mutationFn: async (sentPatientData: IPatientRegistrationFormData) => {
      validateFinalPatientRegistrationForm(sentPatientData);

      const formData = new FormData();

      Object.entries(sentPatientData).forEach(([key, value]) => {
        formData.append(key, value as string | Blob);
      });

      return handlePatientRegistration(formData);
    },
    onSuccess: () => {
      console.log('Patient registered successfully');
    },
  });
};
