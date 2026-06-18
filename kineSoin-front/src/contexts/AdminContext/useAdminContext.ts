import { useContext } from 'react';
import AdminContext from './AdminContext';

export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error(
      'useAdminTableGlobal must be used within an AdminContextProvider'
    );
  }
  return context;
};
