import { useQuery } from '@tanstack/react-query';
import type { FetchAdminEntityDetailsFunctionProps } from '../../../@types/props/customProps';
import { fetchAdminEntityDetails } from '../../functions/apiUtils/admin/fetchAdminEntityDetails';
import type { IEntity } from '../../../@types/types/customTypes';

export function useFetchAdminEntityDetails({
  entityType,
  entity_id,
}: FetchAdminEntityDetailsFunctionProps) {
  return useQuery<IEntity | null>({
    queryKey: ['entityDetails', entityType, entity_id],
    queryFn: () => {
      return fetchAdminEntityDetails<IEntity | null>({
        entityType,
        entity_id,
      });
    },
    enabled: !!entity_id,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
}
