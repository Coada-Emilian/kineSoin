import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context state
interface PatientRegisterContextType {
  isRegisterPageRendered: boolean;
  setIsRegisterPageRendered: React.Dispatch<React.SetStateAction<boolean>>;
  isFirstFormValidated: boolean;
  setIsFirstFormValidated: React.Dispatch<React.SetStateAction<boolean>>;
  isSecondFormValidated: boolean;
  setIsSecondFormValidated: React.Dispatch<React.SetStateAction<boolean>>;
  isThirdFormValidated: boolean;
  setIsThirdFormValidated: React.Dispatch<React.SetStateAction<boolean>>;
  isGlobalFormSubmitted: boolean;
  setIsGlobalFormSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create a context with an empty default value
const PatientRegisterContext = createContext<
  PatientRegisterContextType | undefined
>(undefined);

// Provider component
export const PatientRegisterContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  // Form state hooks
  const [isRegisterPageRendered, setIsRegisterPageRendered] =
    useState<boolean>(false);
  const [isFirstFormValidated, setIsFirstFormValidated] =
    useState<boolean>(false);
  const [isSecondFormValidated, setIsSecondFormValidated] =
    useState<boolean>(false);
  const [isThirdFormValidated, setIsThirdFormValidated] =
    useState<boolean>(false);
  const [isGlobalFormSubmitted, setIsGlobalFormSubmitted] =
    useState<boolean>(false);

  return (
    <PatientRegisterContext.Provider
      value={{
        isRegisterPageRendered,
        setIsRegisterPageRendered,
        isFirstFormValidated,
        setIsFirstFormValidated,
        isSecondFormValidated,
        setIsSecondFormValidated,
        isThirdFormValidated,
        setIsThirdFormValidated,
        isGlobalFormSubmitted,
        setIsGlobalFormSubmitted,
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
