import { useQuery } from '@tanstack/react-query';
import { getTherapistTokenAndDataFromLocalStorage } from '../../utils/localStorage/therapistLocalStorage';

export const useFetchTherapistBasicDataQuery = () => {
  return useQuery({
    queryKey: ['therapist-basic-data'],
    queryFn: () => {
      const response = getTherapistTokenAndDataFromLocalStorage();

      if (!response) {
        throw new Error('No therapist data found in local storage');
      }
      return {
        fullName: response.fullName,
        picture_url: response.picture_url,
        id: response.id,
      };
    },
  });
};
