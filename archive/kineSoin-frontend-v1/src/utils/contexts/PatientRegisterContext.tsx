import React, { createContext, ReactNode, useContext, useState } from 'react';
import { IFormOrders } from '../../@types/types/componentTypes';

// Define the shape of the context state
interface PatientRegisterContextType {
  formOrder: IFormOrders;
  setFormOrder: React.Dispatch<React.SetStateAction<IFormOrders>>;
}

// Create a context with an empty default value
const PatientRegisterContext = createContext<
  PatientRegisterContextType | undefined
>(undefined);

// Provider component
export const PatientRegisterContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [formOrder, setFormOrder] = useState<IFormOrders>('first');

  return (
    <PatientRegisterContext.Provider
      value={{
        formOrder,
        setFormOrder,
      }}
    >
      {children}
    </PatientRegisterContext.Provider>
  );
};

// Custom hook to use the context in any component
export const usePatientRegisterContext = (): PatientRegisterContextType => {
  const context = useContext(PatientRegisterContext);
  if (!context) {
    throw new Error(
      'useRegisterForm must be used within a RegisterFormProvider'
    );
  }
  return context;
};
