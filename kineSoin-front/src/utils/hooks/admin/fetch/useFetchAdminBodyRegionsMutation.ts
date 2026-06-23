import { useMutation } from '@tanstack/react-query';
import type { IBodyRegion } from '../../../../@types/interfaces/modelInterfaces';
import { fetchBodyRegionsAsAdmin } from '../../../functions/apiUtils/admin/region/fetchBodyRegionsAsAdmin';

export const useFetchAdminBodyRegionsMutation = (
  setBodyRegions: (data: IBodyRegion[]) => void
) => {
  return useMutation({
    mutationKey: ['fetchBodyRegions'],
    mutationFn: fetchBodyRegionsAsAdmin,
    onSuccess: (data) => {
      setBodyRegions(data);
    },
    onError: (error: Error) => {
      console.error('Error fetching body regions:', error);
    },
  });
};
