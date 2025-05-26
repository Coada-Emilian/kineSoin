import { useMutation } from '@tanstack/react-query';
import { fetchBodyRegionsAsAdmin } from '../../../../../apiUtils/adminApiUtils/body_region_utils/fetchBodyRegionsAsAdmin';

export const useGetBodyRegionsMutation = () => {
  return useMutation({
    mutationKey: ['getBodyRegions'],
    mutationFn: async () => {
      return await fetchBodyRegionsAsAdmin();
    },
    onSuccess: (data) => {
      console.log('Body regions fetched successfully:', data);
    },
    onError: (error) => {
      console.error('Error fetching body regions:', error);
    },
  });
};
