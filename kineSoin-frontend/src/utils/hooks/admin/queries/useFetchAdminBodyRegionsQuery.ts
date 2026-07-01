import { useQuery } from '@tanstack/react-query';
import { fetchBodyRegionsAsAdmin } from '../../../api/admin/region/fetchBodyRegionsAsAdmin';

export const useFetchAdminBodyRegionsQuery = (enabled: boolean) => {
  return useQuery({
    queryKey: ['bodyRegions'],
    queryFn: fetchBodyRegionsAsAdmin,
    enabled,
  });
};
