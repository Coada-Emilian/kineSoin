/**
 * @function usePatientRegisterMutation
 *
 * This custom hook is used to manage the patient registration process by interacting with
 * the `handlePatientRegistration` function. It handles the form submission, prepares the
 * patient data as `FormData`, and triggers the registration request.
 *
 * On success, it logs a success message to the console.
 *
 * @returns {MutationResult} - The mutation result returned by React Query, which provides
 * useful information about the mutation's state such as `isLoading`, `isSuccess`, etc.
 *
 * @example
 * const registerPatient = usePatientRegisterMutation();
 * registerPatient.mutate(patientData);
 */

import { useMutation } from '@tanstack/react-query';
import { IFormOrders } from '../../../../../../../@types/componentTypes';
import { handlePatientRegistration } from '../../../../../../apiUtils/publicApiUtils';

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
