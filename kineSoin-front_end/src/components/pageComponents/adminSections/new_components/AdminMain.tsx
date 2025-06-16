import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import {
  IEntitiesInterfaces,
  IEntityInterface,
  IEntityTypes,
} from '../../../../@types/types/componentTypes';
import { AdminProfileDetailsGlobalProvider } from '../../../../utils/contexts/AdminProfileDetailsGlobalContext';
import { AdminTableGlobalProvider } from '../../../../utils/contexts/AdminTableGlobalContext';
import DNALoader from '../../../../utils/DNALoader';
import { fetchAdminEntityDetails } from '../../../../utils/functions/admin_section/admin_main/fetchAdminEntityDetails';
import { fetchAdminTableDetails } from '../../../../utils/functions/admin_section/admin_main/fetchAdminTableDetails';
import AdminTableRefactor from '../../../standaloneComponents/admin/adminTable/newComponents/AdminTableRefactor';
import AdminProfileDetailsRefactor from '../../../standaloneComponents/adminSection/adminProfileDetails/newComponents/AdminProfileDetailsRefactor';
import AdminSideNav from '../../../standaloneComponents/generalComponents/layoutComponents/sideNav/newComponents/AdminSideNav';

interface AdminMainProps {
  entityType: IEntityTypes;
}

export default function AdminMain({ entityType }: AdminMainProps) {
  // Get the id from the URL
  const { id } = useParams();

  // Parse the id to an integer
  const entity_id = id ? parseInt(id, 10) : null;

  // Use the useQuery hook to fetch the table data
  const { isPending: isEntitiesLoading, data: entities } = useQuery({
    queryKey: ['fetchTableDataRefactor', { entityType }],
    queryFn: () => fetchAdminTableDetails<IEntitiesInterfaces>({ entityType }),
    refetchOnMount: true, // <--- refetches every time component mounts
    refetchOnWindowFocus: true,
  });

  // Use the useQuery hook to fetch the details data, only if entity_id is present
  const { isPending: isEntityLoading, data: entity } = useQuery({
    queryKey: ['fetchDetailsDataRefactor', { entityType, entityId: entity_id }],
    queryFn: () =>
      fetchAdminEntityDetails<IEntityInterface | null>({
        entityType,
        entityId: entity_id,
      }),
    enabled: !!entity_id, // Only run if entity_id is truthy
    refetchOnMount: true, // <--- refetches every time component mounts
    refetchOnWindowFocus: true,
  });

  // If the entities or entity is loading, display the loader
  if (isEntitiesLoading || (isEntityLoading && entity_id)) {
    return DNALoader();
  }

  return (
    <main className="w-full h-fit bg-gradient-to-r from-white to-gray-200 pb-2 flex p-4">
      <AdminTableGlobalProvider>
        <div className="w-1/4 h-screen hidden md:block">
          <AdminSideNav />
        </div>

        <div className="w-full md:border-l-2 md:border-solid ">
          {entities && !id && (
            <AdminTableRefactor entities={entities} entityType={entityType} />
          )}

          {id && entity && (
            <AdminProfileDetailsGlobalProvider>
              <AdminProfileDetailsRefactor
                entityType={entityType}
                entity={entity}
              />
            </AdminProfileDetailsGlobalProvider>
          )}
        </div>
      </AdminTableGlobalProvider>
    </main>
  );
}
