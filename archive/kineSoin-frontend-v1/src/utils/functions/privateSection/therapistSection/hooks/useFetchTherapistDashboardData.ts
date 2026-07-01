import { useQuery } from '@tanstack/react-query';
import { ISameDayAppointment } from '../../../../../@types/interfaces/customInterfaces';

interface QueryProps {
  tableAppointments: ISameDayAppointment[]; // Current list of appointments in state
  setTableAppointments: React.Dispatch<
    React.SetStateAction<ISameDayAppointment[]>
  >; // Setter function to update appointments state
}

import { useEffect } from 'react';
import { fetchTherapistDashboardData } from '../../../../apiUtils/therapistApiUtils';

// Custom hook to fetch same-day therapist appointments and update local state
export const useFetchTherapistDashboardDataQuery = ({
  setTableAppointments,
  tableAppointments,
}: QueryProps) => {
  // useQuery automatically fetches data and tracks loading, errors, etc.
  const queryResult = useQuery({
    queryKey: ['fetchSameDayAppointments'], // Unique key for caching/query management
    queryFn: fetchTherapistDashboardData, // API call function returning data
    select: (response) => {
      // Transform the raw API response before useQuery returns it
      if (!response || !Array.isArray(response.sameDayAppointments)) {
        // Defensive check if response format is unexpected
        console.warn('Invalid response format');
        return [];
      }

      // Map over sameDayAppointments to format each appointment nicely
      const formattedAppointments: ISameDayAppointment[] =
        response.sameDayAppointments.map((appointment: ISameDayAppointment) => {
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
        });

      // Return the cleaned and formatted list of appointments
      return formattedAppointments;
    },
    // Note: In React Query v5+, error handling is usually done outside useQuery options
  });

  // useEffect to sync the query result data with local state in the component
  useEffect(() => {
    if (queryResult.error) {
      console.error('Error fetching appointments:', queryResult.error);
      return;
    }

    if (queryResult.data) {
      // 1. Remove appointments that no longer exist in the new data
      const updatedAppointments = tableAppointments.filter((existing) =>
        queryResult.data.some((newApp) => newApp.id === existing.id)
      );

      // 2. Add any new appointments that aren't already in the local state
      const newAppointments = queryResult.data.filter(
        (newApp) =>
          !updatedAppointments.some((existing) => existing.id === newApp.id)
      );

      if (
        updatedAppointments.length !== tableAppointments.length ||
        newAppointments.length > 0
      ) {
        setTableAppointments([...updatedAppointments, ...newAppointments]);
      }
    }
  }, [queryResult.data, queryResult.error]);

  // Return the full query result so consuming component can use loading, error, and data states
  return queryResult;
};
