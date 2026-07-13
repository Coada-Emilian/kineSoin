import { useQuery } from '@tanstack/react-query';
import type { IPatientsTableRowData } from '../../@types/interfaces/therapistInterfaces';
import { fetchAllPatientsAsTherapist } from '../../api/therapist/fetchAllPatientsAsTherapist';
export const useFetchAllPatientsAsTherapistQuery = () => {
  const queryResult = useQuery({
    queryKey: ['fetchAllPatientsAsTherapist'],
    queryFn: fetchAllPatientsAsTherapist,
    select: (patients: IPatientsTableRowData[]) => {
      if (!Array.isArray(patients)) {
        console.warn('Invalid response format for all patients data');
        return [];
      }

      return patients.map((patient: IPatientsTableRowData) => ({
        id: patient.id,
        fullName: patient.fullName,
        email: patient.email,
        fullPhoneNumber: patient.fullPhoneNumber,
        status: patient.status,
        therapist: patient.therapist || null,
      }));
    },
  });

  return queryResult;
};
