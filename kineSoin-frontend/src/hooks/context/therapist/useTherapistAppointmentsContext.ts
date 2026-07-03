import { useContext } from 'react';
import TherapistAppointmentsContext from '../../../contexts/therapist/TherapistAppointmentsContext';

export const useTherapistAppointmentsContext = () => {
  const context = useContext(TherapistAppointmentsContext);
  if (!context) {
    throw new Error(
      'useAppointmentsContext must be used within an AppointmentsContextProvider'
    );
  }
  return context;
};
