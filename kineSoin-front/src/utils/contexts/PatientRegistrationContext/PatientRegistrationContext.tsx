import { createContext, useState, type ReactNode } from 'react';
import type { IPatientRegistrationContext } from '../../../@types/interfaces/contextInterfaces';
import type { FormOrderTypes } from '../../../@types/types/customTypes';

const PatientRegistrationContext = createContext<
  IPatientRegistrationContext | undefined
>(undefined);

export const PatientRegistrationContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [formOrder, setFormOrder] = useState<FormOrderTypes>('first');

  return (
    <PatientRegistrationContext.Provider
      value={{
        formOrder,
        setFormOrder,
      }}
    >
      {children}
    </PatientRegistrationContext.Provider>
  );
};

export default PatientRegistrationContext;
