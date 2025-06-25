import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { IUserProfile } from '../../../../../@types/interfaces/customInterfaces';
import { getTherapistTokenAndDataFromLocalStorage } from '../../../../../localStorage/therapistLocalStorage';

interface QueryProps {
  setTherapist: React.Dispatch<React.SetStateAction<IUserProfile | undefined>>;
}
export const useFetchTherapistBasicData = ({ setTherapist }: QueryProps) => {
  const queryResult = useQuery({
    queryKey: ['fetchTherapistBasicData'],
    queryFn: async () => {
      const response = getTherapistTokenAndDataFromLocalStorage();

      if (!response) {
        throw new Error('No therapist data found in local storage');
      }
      return {
        token: response.token,
        fullName: response.fullName,
        picture_url: response.picture_url,
        id: response.id,
      };
    },
  });

  useEffect(() => {
    if (queryResult.isSuccess) {
      setTherapist(queryResult.data as IUserProfile);
      console.log('Therapist data fetched successfully');
    } else if (queryResult.isError) {
      console.error('Error fetching therapist data:', queryResult.error);
    }
  }, [queryResult, setTherapist]);
};
