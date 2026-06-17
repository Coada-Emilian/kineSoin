import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import type {
  IEntities,
  IEntity,
} from '../../@types/interfaces/contextInterfaces';
import type { AdminPageProps } from '../../@types/props/customProps';
import AdminSideNavbar from '../../components/admin/AdminSideNavbar';
import DNALoader from '../../components/ui/DNALoader';
import { fetchAdminEntityDetails } from '../../utils/functions/apiUtils/admin/fetchAdminEntityDetails';
import { fetchAdminTableDetails } from '../../utils/functions/apiUtils/admin/fetchAdminTableDetails';

export default function AdminMain({ entityType }: AdminPageProps) {
  // Get the id from the URL
  const { id } = useParams();

  // Parse the id to an integer
  const entity_id = id ? parseInt(id, 10) : null;

  const { isPending: isEntityLoading, data: entity } = useQuery({
    queryKey: ['fetchDetailsDataRefactor', { entityType, entity_id }],
    queryFn: () =>
      fetchAdminEntityDetails<IEntity | null>({
        entityType,
        entity_id,
      }),
    enabled: !!entity_id,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const { isPending: isEntitiesLoading, data: entities } = useQuery({
    queryKey: ['fetchTableDataRefactor', { entityType }],
    queryFn: () => fetchAdminTableDetails<IEntities>({ entityType }),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  if (isEntitiesLoading || isEntityLoading) {
    return DNALoader();
  }

  return (
    <main className="w-full h-fit flex p-4 pb-2 bg-linear-to-r from-white to-gray-200">
      <div className="hidden h-screen w-1/4 md:block">
        <AdminSideNavbar />
      </div>

      {/* <div className="w-full md:border-l-2 md:border-solid">
        {entities && !id && (
          <AdminTableRefactor entities={entities} entityType={entityType} />
        )}

        {id && entity && (
     
            <AdminProfileDetailsRefactor
              entityType={entityType}
              entity={entity}
            />
       
        )}
      </div> */}
    </main>
  );
}
