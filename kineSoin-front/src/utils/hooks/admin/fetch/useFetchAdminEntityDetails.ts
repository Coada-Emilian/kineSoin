import { useQuery } from '@tanstack/react-query';
import type { FetchAdminEntityDetailsFunctionProps } from '../../../../@types/props/functionProps';
import type { IAdminEntity } from '../../../../@types/types/adminTypes';
import { fetchAdminEntityDetails } from '../../../functions/apiUtils/admin/fetchAdminEntityDetails';

export function useFetchAdminEntityDetails({
  entityType,
  entity_id,
}: FetchAdminEntityDetailsFunctionProps) {
  return useQuery<IAdminEntity | null>({
    queryKey: ['entityDetails', entityType, entity_id],
    queryFn: () => {
      return fetchAdminEntityDetails<IAdminEntity | null>({
        entityType,
        entity_id,
      });
    },
    enabled: !!entity_id,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
}
