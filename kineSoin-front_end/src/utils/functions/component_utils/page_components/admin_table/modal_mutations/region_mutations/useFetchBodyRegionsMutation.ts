import { useMutation } from '@tanstack/react-query';
import { fetchBodyRegionsAsAdmin } from '../../../../../../apiUtils/adminApiUtils/body_region_utils/adminBodyRegionApiUtils';

export const useFetchBodyRegionsMutation = (
  setBodyRegions: (data: any) => void
) => {
  return useMutation({
    mutationKey: ['fetchBodyRegions'],
    mutationFn: fetchBodyRegionsAsAdmin,
    onSuccess: (data) => {
      setBodyRegions(data);
    },
    onError: (error: any) => {
      console.error('Error fetching body regions:', error);
    },
  });
};
