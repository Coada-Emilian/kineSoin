import { useContext } from 'react';
import type { IPatientRegistrationContext } from '../../@types/interfaces/contextInterfaces';
import PatientRegistrationContext from '../../contexts/PatientRegistrationContext/PatientRegistrationContext';

export const usePatientRegistrationContext =
  (): IPatientRegistrationContext => {
    const context = useContext(PatientRegistrationContext);
    if (!context) {
      throw new Error(
        'usePatientRegistrationContext must be used within a PatientRegistrationContextProvider'
      );
    }
    return context;
  };
