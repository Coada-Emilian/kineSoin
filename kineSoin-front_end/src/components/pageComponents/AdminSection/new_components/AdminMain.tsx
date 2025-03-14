import { useParams } from 'react-router-dom';
import DNALoader from '../../../../utils/DNALoader';
import {
  fetchDetailsDataRefactor,
  fetchTableDataRefactor,
} from '../../../../utils/pageUtils/AdminSection/AdminMainUtils/adminMainUtilsRefactor';
import AdminTableRefactor from '../../../standaloneComponents/AdminSection/AdminTable/new_components/AdminTableRefactor';
import AdminProfileDetailsRefactor from '../../../standaloneComponents/AdminSection/AdminProfileDetails/AdminProfileDetailsRefactor';
import {
  IEntitiesInterfaces,
  IEntityInterface,
  IEntityTypes,
} from '../../../../@types/componentTypes';
import { AdminTableGlobalProvider } from '../../../../utils/contexts/AdminTableGlobalContext';
import AdminSideNav from '../../../standaloneComponents/generalComponents/SideNav/new_components/AdminSideNav';
import { useQuery } from '@tanstack/react-query';

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
    queryFn: () => fetchTableDataRefactor<IEntitiesInterfaces>({ entityType }),
  });

  // Use the useQuery hook to fetch the details data
  const { isPending: isEntityLoading, data: entity } = useQuery({
    queryKey: ['fetchDetailsDataRefactor', { entityType, entityId: entity_id }],
    queryFn: () =>
      fetchDetailsDataRefactor<IEntityInterface | null>({
        entityType,
        entityId: entity_id,
      }),
  });

  // If the entities or entity is loading, display the loader
  if (isEntitiesLoading || isEntityLoading) {
    return DNALoader();
  }

  return (
    <main className="w-full h-fit bg-gradient-to-r from-white to-gray-200 pb-2 flex p-4">
      <div className="w-1/4 h-screen hidden md:block">
        <AdminSideNav />
      </div>

      <div className="w-full md:border-l-2 md:border-solid ">
        {entities && entities.length > 0 && !id && (
          <AdminTableGlobalProvider>
            <AdminTableRefactor entities={entities} entityType={entityType} />
          </AdminTableGlobalProvider>
        )}

        {id && (
          <AdminProfileDetailsRefactor
            entityType={entityType}
            entity={entity}
          />
        )}
      </div>
    </main>
  );
}
