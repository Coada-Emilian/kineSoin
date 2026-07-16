import { useContext } from 'react';
import TherapistUiContext from '../../../contexts/therapist/TherapistUiContext';

export const useTherapistUiContext = () => {
  const context = useContext(TherapistUiContext);
  if (context === undefined) {
    throw new Error('useUIContext must be used within a UIContextProvider');
  }
  return context;
};
