import { useQuery } from '@tanstack/react-query';
import { fetchConnectedTherapistData } from '../../api/therapist/fetchConnectedTherapistData';

export const useFetchTherapistDataQuery = () => {
  return useQuery({
    queryKey: ['therapistBasicData'],
    queryFn: async () => {
      const response = await fetchConnectedTherapistData();
      if (!response) {
        throw new Error('No therapist data found in local storage');
      }
      return {
        response,
      };
    },
  });
};
