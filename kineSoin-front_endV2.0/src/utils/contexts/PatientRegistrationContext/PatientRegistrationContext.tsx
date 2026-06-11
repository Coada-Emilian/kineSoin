import { createContext, useState, type ReactNode } from 'react';
import type { PatientRegistrationContextInterface } from '../../../@types/interfaces/contextInterfaces';
import type { FormOrderTypes } from '../../../@types/types/customTypes';

const PatientRegistrationContext = createContext<
  PatientRegistrationContextInterface | undefined
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
