import { useQuery } from '@tanstack/react-query';
import type {
  IEntities,
  IEntity,
} from '../../../@types/interfaces/contextInterfaces';
import { fetchAdminTableDetails } from '../../functions/apiUtils/admin/fetchAdminTableDetails';
import type { FetchAdminTableDataFunctionProps } from '../../../@types/props/customProps';

export function useFetchAdminTableDetails({
  entityType,
}: FetchAdminTableDataFunctionProps) {
  return useQuery<IEntity | null>({
    queryKey: ['tableDetails', { entityType }],
    queryFn: () => fetchAdminTableDetails<IEntities>({ entityType }),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
}
