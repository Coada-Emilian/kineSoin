import { useQuery } from '@tanstack/react-query';
import type { IPatientDetailsDto } from '../../@types/interfaces/therapistInterfaces';
import { fetchPatientDetailsAsTherapist } from '../../api/therapist/fetchPatientDetailsAsTherapist';

interface QueryProps {
  patient_id: number;
}

export const useFetchPatientDetailsAsTherapistQuery = ({
  patient_id,
}: QueryProps) => {
  const queryResult = useQuery({
    queryKey: ['fetchPatientDetailsAsTherapist', patient_id],
    queryFn: () => fetchPatientDetailsAsTherapist(patient_id),
    enabled: patient_id > 0,
    select: (data): IPatientDetailsDto => ({
      id: data.id,
      therapist_id: data.therapist_id,
      name: data.name,
      surname: data.surname,
      age: data.age,
      street_number: data.street_number,
      street_name: data.street_name,
      postal_code: data.postal_code,
      city: data.city,
      prefix: data.prefix,
      phone_number: data.phone_number,
      status: data.status,
      picture_url: data.picture_url,
      email: data.email,
      insurance_details: data.insurance_details ? data.insurance_details : null,
      therapist: data.therapist,
      gender: data.gender,
    }),
  });
  return queryResult;
};
