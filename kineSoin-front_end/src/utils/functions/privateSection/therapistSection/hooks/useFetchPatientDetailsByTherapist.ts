import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { ITherapistPatientDetails } from '../../../../../@types/interfaces/customInterfaces';
import { fetchPatientDataAsTherapist } from '../../../../apiUtils/therapistApiUtils';

interface QueryProps {
  patient_id: number;
  setPatientDetails: React.Dispatch<
    React.SetStateAction<ITherapistPatientDetails | null>
  >;
}

export const useFetchPatientDetailsByTherapist = ({
  patient_id,
  setPatientDetails,
}: QueryProps) => {
  const queryResult = useQuery({
    queryKey: ['fetchPatientDetailsByTherapist', patient_id],
    queryFn: () => fetchPatientDataAsTherapist(patient_id),
    //     enabled: !!patient_id,
    select: (data): ITherapistPatientDetails => ({
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
      insurance_details: data.insurance_details,
      therapist: data.therapist,
    }),
  });

  useEffect(() => {
    if (queryResult.isSuccess && queryResult.data) {
      setPatientDetails(queryResult.data);
    } else if (queryResult.isError) {
      console.error('Error fetching patient details:', queryResult.error);
      setPatientDetails(null);
    }
  }, [
    queryResult.data,
    queryResult.isSuccess,
    queryResult.isError,
    setPatientDetails,
  ]);

  return queryResult;
};
