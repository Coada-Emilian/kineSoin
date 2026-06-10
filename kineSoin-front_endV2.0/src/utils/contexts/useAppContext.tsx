import React from 'react';
import AppContext from './AppContext';

export const useAppContext = () => {
  const context = React.useContext(AppContext);

  if (!context) {
    throw new Error(
      'useGlobalContext must be used within a GlobalAdminContextProvider'
    );
  }

  return context;
};
