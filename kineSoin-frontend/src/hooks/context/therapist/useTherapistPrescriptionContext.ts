import { useContext } from 'react';
import TherapistPrescriptionsContext from '../../../contexts/therapist/TherapistPrescriptionContext';

export const useTherapistPrescriptionsContext = () => {
  const context = useContext(TherapistPrescriptionsContext);
  if (!context) {
    throw new Error(
      'usePrescriptionsContext must be used within a PrescriptionsContextProvider'
    );
  }
  return context;
};
