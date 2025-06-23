/**
 * @module AdminAddTherapistFormGlobalContext
 *
 * Provides a global React context for managing the state of the "Add Therapist" form in the admin section.
 * This context stores the form data and provides a setter function to update it.
 *
 * @typedef {Object} AdminAddTherapistFormGlobalContextType
 * @property {IAddForm} addForm - The current state of the add therapist form.
 * @property {(form: IAddForm) => void} setAddForm - Function to update the add therapist form state.
 *
 * @component
 * @param {ReactNode} children - React children components wrapped by this provider.
 *
 * @returns {JSX.Element} - Context provider that supplies form state and setter to its descendants.
 *
 * @example
 * <AdminAddTherapistFormGlobalProvider>
 *   <YourComponent />
 * </AdminAddTherapistFormGlobalProvider>
 *
 * @hook
 * useAdminAddTherapistFormGlobalContext
 * A custom hook to consume the add therapist form context. Throws an error if used outside the provider.
 *
 * @remarks
 * - Initial form state includes fields like name, surname, email, password, specialty, status, etc.
 * - Ensures centralized and consistent form state management for therapist addition.
 */

import { createContext, ReactNode, useContext, useState } from 'react';
import { IAddForm } from '../../@types/interfaces/customInterfaces';

// Define the type for the context
interface AdminAddTherapistFormGlobalContextType {
  addForm: IAddForm;
  setAddForm: (form: IAddForm) => void;
}

// Create the context
const AdminAddTherapistFormGlobalContext = createContext<
  AdminAddTherapistFormGlobalContextType | undefined
>(undefined);

// Provider component
export const AdminAddTherapistFormGlobalProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  // State for the add form
  const [addForm, setAddForm] = useState<IAddForm>({
    name: '',
    surname: '',
    email: '',
    password: '',
    repeated_password: '',
    description: '',
    diploma: '',
    experience: '',
    specialty: '',
    licence_code: '',
    status: '',
    photo: undefined,
    prefix: '',
    phone_number: '',
    full_phone_number: '',
  });

  return (
    <AdminAddTherapistFormGlobalContext.Provider
      value={{ addForm, setAddForm }}
    >
      {children}
    </AdminAddTherapistFormGlobalContext.Provider>
  );
};

// Custom hook to use the context
export const useAdminAddTherapistFormGlobalContext = () => {
  const context = useContext(AdminAddTherapistFormGlobalContext);
  if (!context) {
    throw new Error(
      'useAdminAddTherapistFormGlobalContext must be used within an AdminAddTherapistFormGlobalProvider'
    );
  }
  return context;
};
