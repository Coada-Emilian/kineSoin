import { useContext } from 'react';
import TherapistSelectionContext from '../../../contexts/therapist/TherapistSelectionContext';

export const useTherapistSelectionContext = () => {
  const context = useContext(TherapistSelectionContext);
  if (context === undefined) {
    throw new Error(
      'useTherapistSelectionContext must be used within a TherapistSelectionContextProvider'
    );
  }
  return context;
};
