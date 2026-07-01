import { useContext } from 'react';
import AdminEntityProfileContext from '../../../contexts/admin/AdminEntityProfileContext';

export const useAdminEntityProfileContext = () => {
  const context = useContext(AdminEntityProfileContext);
  if (context === undefined) {
    throw new Error(
      'useAdminEntityProfileContext must be used within a AdminEntityProfileContextProvider'
    );
  }
  return context;
};
