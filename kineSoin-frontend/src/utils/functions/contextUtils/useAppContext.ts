import React from 'react';
import AppContext from '../../../contexts/AppContext/AppContext';

export const useAppContext = () => {
  const context = React.useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within a AppContextProvider');
  }

  return context;
};
