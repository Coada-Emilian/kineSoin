import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import type {
  IEntities,
  IEntity,
} from '../../@types/interfaces/contextInterfaces';
import type { AdminPageProps } from '../../@types/props/customProps';
import AdminSideNavbar from '../../components/pages/admin/AdminSideNavbar';
import AdminTable from '../../components/pages/admin/table/AdminTable';
import DNALoader from '../../components/ui/DNALoader';
import { AdminContextProvider } from '../../contexts/AdminContext/AdminContext';
import { fetchAdminEntityDetails } from '../../utils/functions/apiUtils/admin/fetchAdminEntityDetails';
import { fetchAdminTableDetails } from '../../utils/functions/apiUtils/admin/fetchAdminTableDetails';

export default function AdminMain({ entityType }: AdminPageProps) {
  // Get the id from the URL
  const { id } = useParams();

  // Parse the id to an integer
  const entity_id = id ? parseInt(id, 10) : null;

  const { isFetching: isEntitiesLoading, data: entities } = useQuery({
    queryKey: ['fetchTableData', { entityType }],
    queryFn: () => fetchAdminTableDetails<IEntities>({ entityType }),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const { isFetching: isEntityLoading, data: entity } = useQuery({
    queryKey: ['fetchDetailsData', { entityType, entity_id }],
    queryFn: () => {
      console.log('🔥 FETCHING ENTITY DETAILS');
      return fetchAdminEntityDetails<IEntity | null>({
        entityType,
        entity_id,
      });
    },
    enabled: !!entity_id,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  if (isEntitiesLoading) {
    return (
      <div className="flex items-center justify-center w-full min-h-[70vh]">
        <DNALoader />
      </div>
    );
  }

  return (
    <AdminContextProvider>
      <div className="hidden h-screen w-1/4 md:block">
        <AdminSideNavbar />
      </div>

      <div className="w-full md:border-l md:border-gray-300">
        {entities && !id && (
          <AdminTable entities={entities} entityType={entityType} />
        )}

        {/* {id && entity && (
            <AdminProfileDetailsRefactor
              entityType={entityType}
              entity={entity}
            />
          )} */}
      </div>
    </AdminContextProvider>
  );
}
