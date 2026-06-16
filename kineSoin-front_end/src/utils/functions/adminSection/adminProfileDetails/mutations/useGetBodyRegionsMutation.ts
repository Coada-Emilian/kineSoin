import { useMutation } from '@tanstack/react-query';
import { fetchBodyRegionsAsAdmin } from '../../../../apiUtils/adminApiUtils/bodyRegionApiUtils/fetchBodyRegionsAsAdmin';

export const useGetBodyRegionsMutation = () => {
  return useMutation({
    mutationKey: ['getBodyRegions'],
    mutationFn: async () => {
      return await fetchBodyRegionsAsAdmin();
    },
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      console.error('Error fetching body regions:', error);
    },
  });
};
