import { useContext } from 'react';
import type { PatientRegistrationContextInterface } from '../../../@types/interfaces/contextInterfaces';
import PatientRegistrationContext from './PatientRegistrationContext';

export const usePatientRegistrationContext =
  (): PatientRegistrationContextInterface => {
    const context = useContext(PatientRegistrationContext);
    if (!context) {
      throw new Error(
        'usePatientRegistrationContext must be used within a PatientRegistrationContextProvider'
      );
    }
    return context;
  };
