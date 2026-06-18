import React from 'react';
import AuthentificationContext from './AuthentificationContext';

// Custom hook for easy use of the authentication context
export const useAuthentificationContext = () => {
  const context = React.useContext(AuthentificationContext);

  if (!context) {
    throw new Error(
      'useAuthentificationContext must be used within a AuthentificationContext'
    );
  }

  return context;
};
