import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { IUserProfile } from '../../../../../@types/interfaces/customInterfaces';
import { fetchTherapistsByTherapist } from '../../../../apiUtils/therapistApiUtils/fetchTherapistsByTherapist';

interface QueryProps {
  setTherapists: React.Dispatch<React.SetStateAction<IUserProfile[]>>;
}

export const useFetchTherapistsByTherapist = ({
  setTherapists,
}: QueryProps) => {
  const queryResult = useQuery({
    queryKey: ['fetchTherapistsByTherapist'],
    queryFn: fetchTherapistsByTherapist,
    select: (therapists) => {
      if (!Array.isArray(therapists)) {
        console.warn('Invalid response format for therapists data');
        return [];
      }

      return therapists.map((therapist) => ({
        id: therapist.id,
        fullName: therapist.name + ' ' + therapist.surname,
        picture_url: therapist.picture_url,
      }));
    },
  });

  useEffect(() => {
    if (queryResult.isSuccess && queryResult.data) {
      setTherapists(queryResult.data);
      console.log('Therapists data fetched successfully');
    } else if (queryResult.isError) {
      console.error('Error fetching therapists data:', queryResult.error);
    }
  }, [
    queryResult.data,
    queryResult.isSuccess,
    queryResult.isError,
    setTherapists,
  ]);

  return queryResult;
};
