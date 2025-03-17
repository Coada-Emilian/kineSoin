/**
 * @component AdminMain
 *
 * A component that renders the main admin section page, showing either a table of entities or the
 * details of a specific entity depending on the route.
 *
 * @param {IEntityTypes} entityType - The type of entity (e.g., therapist, patient, etc.) to display.
 *
 * @returns JSX.Element - The rendered admin main page with either a table or entity details based on the route.
 *
 * @example
 * <AdminMain entityType="therapists" />
 *
 * @remarks
 * - Uses React Query's `useQuery` hook to fetch the list of entities and entity details.
 * - Displays a loader while fetching data and shows the appropriate content once loading is complete.
 * - The layout consists of a side navigation bar and a content section displaying either the table or profile details.
 */

import { useParams } from 'react-router-dom';
import DNALoader from '../../../../utils/DNALoader';
import {
  fetchDetailsDataRefactor,
  fetchTableDataRefactor,
} from '../../../../utils/componentUtils/pageComponents/functions/adminSection/AdminMainUtils/adminMainUtilsRefactor';
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

  // Use the useQuery hook to fetch the details data, only if entity_id is present
  const { isPending: isEntityLoading, data: entity } = useQuery({
    queryKey: ['fetchDetailsDataRefactor', { entityType, entityId: entity_id }],
    queryFn: () =>
      fetchDetailsDataRefactor<IEntityInterface | null>({
        entityType,
        entityId: entity_id,
      }),
    enabled: !!entity_id, // Only run if entity_id is truthy
  });

  // If the entities or entity is loading, display the loader
  if (isEntitiesLoading || (isEntityLoading && entity_id)) {
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

        {id && entity && (
          <AdminProfileDetailsRefactor
            entityType={entityType}
            entity={entity}
          />
        )}
      </div>
    </main>
  );
}
