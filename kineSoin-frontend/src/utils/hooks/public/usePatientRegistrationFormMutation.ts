import { useMutation } from '@tanstack/react-query';
import type { FormOrderTypes } from '../../../@types/types/formTypes';
import { validateFirstPatientRegistrationForm } from './validators/validateFirstPatientRegistrationForm';
import { validateSecondPatientRegistrationForm } from './validators/validateSecondPatientRegistrationForm';
import { validateThirdPatientRegistrationForm } from './validators/validateThirdPatientRegistrationForm';

export const usePatientRegistrationFormMutation = (
  formOrder: FormOrderTypes,
  patientImage: File | null
) => {
  return useMutation({
    mutationKey: ['patientRegister', formOrder],
    mutationFn: async (formData: FormData) => {
      if (formOrder === 'first') {
        validateFirstPatientRegistrationForm(formData);

        const sentData = {
          name: formData.get('name') as string,
          birth_name: formData.get('birth_name') as string,
          surname: formData.get('surname') as string,
          birth_date: formData.get('birth_date') as string,
          gender: formData.get('gender') as string,
        };
        return sentData;
      }

      if (formOrder === 'second') {
        validateSecondPatientRegistrationForm(formData);

        const sentData = {
          street_number: formData.get('street_number') as string,
          street_name: formData.get('street_name') as string,
          postal_code: formData.get('postal_code') as string,
          city: formData.get('city') as string,
          prefix: formData.get('prefix') as string,
          phone_number: formData.get('phone_number') as string,
          full_phone_number: `${formData.get('prefix') as string} ${formData.get('phone_number') as string}`,
        };

        return sentData;
      }
      if (formOrder === 'third') {
        validateThirdPatientRegistrationForm(formData, patientImage);

        const sentData = {
          email: formData.get('email') as string,
          password: formData.get('password') as string,
          repeated_password: formData.get('confirm-password') as string,
          picture: patientImage as File,
        };
        return sentData;
      }
      return;
    },
  });
};
