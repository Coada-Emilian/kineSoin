import { useQuery } from '@tanstack/react-query';
import type { IPatientsTableRowDataDto } from '../../@types/interfaces/therapistInterfaces';
import { fetchAllPatientsAsTherapist } from '../../api/therapist/fetchAllPatientsAsTherapist';

export const useFetchAllPatientsAsTherapistQuery = () => {
  const queryResult = useQuery({
    queryKey: ['fetchAllPatientsAsTherapist'],
    queryFn: fetchAllPatientsAsTherapist,
    select: (patients: IPatientsTableRowDataDto[]) => {
      if (!Array.isArray(patients)) {
        console.warn('Invalid response format for all patients data');
        return [];
      }

      return patients.map((patient: IPatientsTableRowDataDto) => ({
        id: patient.id,
        name: patient.name,
        surname: patient.surname,
        picture_url: patient.picture_url,
        email: patient.email,
        prefix: patient.prefix,
        phone_number: patient.phone_number,
        status: patient.status,
        therapist: patient.therapist || null,
        lastAppointmentAt: patient.lastAppointmentAt || null,
        createdAt: patient.createdAt || null,
        fullName: `${patient.name} ${patient.surname}`.trim(),
        fullPhoneNumber: `${patient.prefix} ${patient.phone_number}`.trim(),
      }));
    },
  });

  return queryResult;
};
