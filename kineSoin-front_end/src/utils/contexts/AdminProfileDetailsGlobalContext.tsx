import { useContext, useState, createContext } from 'react';

interface AdminProfileDetailsGlobalContextType {
  isProfileEditing: boolean;
  setIsProfileEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminProfileDetailsGlobalContext = createContext<
  AdminProfileDetailsGlobalContextType | undefined
>(undefined);

export const AdminProfileDetailsGlobalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isProfileEditing, setIsProfileEditing] = useState(false);

  return (
    <AdminProfileDetailsGlobalContext.Provider
      value={{
        isProfileEditing,
        setIsProfileEditing,
      }}
    >
      {children}
    </AdminProfileDetailsGlobalContext.Provider>
  );
};

export const useAdminProfileDetailsGlobalContext = () => {
  const context = useContext(AdminProfileDetailsGlobalContext);
  if (context === undefined) {
    throw new Error(
      'useAdminProfileDetailsGlobalContext must be used within a AdminProfileDetailsGlobalProvider'
    );
  }
  return context;
};
