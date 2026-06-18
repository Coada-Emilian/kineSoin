import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
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

  const { isPending: isEntitiesLoading, data: entities } = useQuery({
    queryKey: ['fetchTableData', { entityType }],
    queryFn: () => fetchAdminTableDetails<IEntities>({ entityType }),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const { isPending: isEntityLoading, data: entity } = useQuery({
    queryKey: ['fetchDetailsData', { entityType, entity_id }],
    queryFn: () =>
      fetchAdminEntityDetails<IEntity | null>({
        entityType,
        entity_id,
      }),
    enabled: !!entity_id,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    console.log('isEntitiesLoading', isEntitiesLoading);
    console.log('isEntityLoading', isEntityLoading);
  }, [isEntitiesLoading, isEntityLoading]);

  if (isEntitiesLoading) {
    return DNALoader();
  }

  return (
    <main className="w-full h-fit flex p-4 pb-2 bg-linear-to-r from-white to-gray-200">
      <AdminContextProvider>
        <div className="hidden h-screen w-1/4 md:block">
          <AdminSideNavbar />
        </div>

        <div className="w-full md:border-l-2 md:border-solid">
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
    </main>
  );
}
