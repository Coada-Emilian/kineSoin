import { useQuery } from '@tanstack/react-query';

import type { ISameDayAppointment } from '../../../@types/interfaces/therapistInterfaces';
import { fetchTherapistDashboardData } from '../../../api/therapist/fetchTherapistDashboardData';

// Custom hook to fetch same-day therapist appointments and update local state
export const useFetchTherapistDashboardDataQuery = () => {
  // useQuery automatically fetches data and tracks loading, errors, etc.
  return useQuery({
    queryKey: ['fetchSameDayAppointments'], // Unique key for caching/query management
    queryFn: fetchTherapistDashboardData, // API call function returning data
    select: (response) => {
      if (!response || !Array.isArray(response)) {
        console.warn('Invalid response format');
        return [];
      }

      // Map over sameDayAppointments to format each appointment nicely
      const formattedAppointments: ISameDayAppointment[] = response.map(
        (appointment: ISameDayAppointment) => {
          // Keep only the first 5 characters of the time string (e.g. "14:30")
          const formattedTime = appointment.time.slice(0, 5);

          // Return a new object with only the fields we want, plus computed ones
          return {
            id: appointment.id,
            time: formattedTime,
            patient: appointment.patient,
            prescription: appointment.prescription,
            patientFullName: `${appointment.patient.name} ${appointment.patient.surname}`, // Combined full name
            afflictionName: appointment.prescription.affliction.name,
            // Affliction's name for display
          };
        }
      );

      // Return the cleaned and formatted list of appointments
      return formattedAppointments;
    },
  });
};
