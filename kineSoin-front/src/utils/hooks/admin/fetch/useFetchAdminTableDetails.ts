import { useQuery } from '@tanstack/react-query';
import type {
  IEntities,
  IEntity,
} from '../../../../@types/interfaces/contextInterfaces';
import type { FetchAdminTableDataFunctionProps } from '../../../@types/props/customProps';
import { fetchAdminTableDetails } from '../../../functions/apiUtils/admin/fetchAdminTableDetails';

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
