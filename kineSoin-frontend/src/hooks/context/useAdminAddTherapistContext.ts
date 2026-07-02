import { useContext } from 'react';
import AdminAddTherapistContext from '../../contexts/admin/AdminAddTherapistContext';

export const useAdminAddTherapistContext = () => {
  const context = useContext(AdminAddTherapistContext);
  if (!context) {
    throw new Error(
      'useAdminAddTherapistContext must be used within an AdminAddTherapistContextProvider'
    );
  }
  return context;
};
