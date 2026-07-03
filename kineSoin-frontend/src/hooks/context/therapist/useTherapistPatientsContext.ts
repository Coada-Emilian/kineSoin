import { useContext } from 'react';
import TherapistPatientsContext from '../../../contexts/therapist/TherapistPatientsContext';

export const useTherapistPatientsContext = () => {
  const context = useContext(TherapistPatientsContext);
  if (!context) {
    throw new Error(
      'usePatientsContext must be used within a PatientsContextProvider'
    );
  }
  return context;
};
