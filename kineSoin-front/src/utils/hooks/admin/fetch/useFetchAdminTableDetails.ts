import { useQuery } from '@tanstack/react-query';
import type { FetchAdminTableDataFunctionProps } from '../../../../@types/props/functionProps';
import type {
  IAdminEntities,
  IAdminEntity,
} from '../../../../@types/types/adminTypes';
import { fetchAdminTableDetails } from '../../../functions/apiUtils/admin/fetchAdminTableDetails';

export function useFetchAdminTableDetails({
  entityType,
}: FetchAdminTableDataFunctionProps) {
  return useQuery<IAdminEntity | null>({
    queryKey: ['tableDetails', { entityType }],
    queryFn: () => fetchAdminTableDetails<IAdminEntities>({ entityType }),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
}
