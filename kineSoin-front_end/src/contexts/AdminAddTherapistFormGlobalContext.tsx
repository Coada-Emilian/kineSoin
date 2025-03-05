import { createContext, useContext, useState, ReactNode } from 'react';
import { IAddForm } from '../@types/formInterfaces';

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
