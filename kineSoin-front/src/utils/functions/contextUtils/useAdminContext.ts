import { useContext } from 'react';
import AdminContext from '../../../contexts/admin/AdminContext/AdminContext';

export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error(
      'useAdminTableGlobal must be used within an AdminContextProvider'
    );
  }
  return context;
};
