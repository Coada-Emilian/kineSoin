import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { IUserProfile } from '../../../../../@types/interfaces/customInterfaces';
import { fetchPatientsAsTherapist } from '../../../../apiUtils/therapistApiUtils';

interface QueryProps {
  setTherapistPatients: React.Dispatch<React.SetStateAction<IUserProfile[]>>;
}

export const useFetchTherapistPatientsData = ({
  setTherapistPatients,
}: QueryProps) => {
  const queryResult = useQuery({
    queryKey: ['fetchTherapistPatientsData'],
    queryFn: fetchPatientsAsTherapist,
    select: (patients) => {
      if (!Array.isArray(patients)) {
        console.warn('Invalid response format for therapist patients data');
        return [];
      }

      return patients.map((patient: IUserProfile) => ({
        id: patient.id,
        fullName: patient.fullName,
        picture_url: patient.picture_url,
        status: patient.status,
        therapist: patient.therapist,
      }));
    },
  });

  useEffect(() => {
    if (queryResult.isSuccess && queryResult.data) {
      setTherapistPatients(queryResult.data);
      console.log('Therapist patients data fetched successfully');
    } else if (queryResult.isError) {
      console.error(
        'Error fetching therapist patients data:',
        queryResult.error
      );
    }
  }, [
    queryResult.data,
    queryResult.isSuccess,
    queryResult.isError,
    setTherapistPatients,
  ]);

  return queryResult;
};
