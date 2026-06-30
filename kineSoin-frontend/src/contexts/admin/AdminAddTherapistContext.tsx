import { createContext, useState, type ReactNode } from 'react';
import type { IAdminAddTherapistContext } from '../../@types/interfaces/contextInterfaces';
import type { IAddTherapistFormData } from '../../@types/interfaces/formInterfaces';

const AdminAddTherapistContext = createContext<
  IAdminAddTherapistContext | undefined
>(undefined);

export const AdminAddTherapistContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  // State for the add form
  const [addForm, setAddForm] = useState<IAddTherapistFormData>({
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
    <AdminAddTherapistContext.Provider value={{ addForm, setAddForm }}>
      {children}
    </AdminAddTherapistContext.Provider>
  );
};

export default AdminAddTherapistContext;
