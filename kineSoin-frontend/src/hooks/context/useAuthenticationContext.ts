import React from 'react';
import AuthentificationContext from '../../contexts/AuthenticationContext/AuthenticationContext';

// Custom hook for easy use of the authentication context
export const useAuthenticationContext = () => {
  const context = React.useContext(AuthentificationContext);

  if (!context) {
    throw new Error(
      'useAuthentificationContext must be used within a AuthentificationContext'
    );
  }

  return context;
};
