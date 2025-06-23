/**
 * AdminMain.tsx
 *
 * Main admin interface component responsible for displaying either:
 * - A table of entities (e.g., therapists, patients, etc.)
 * - The detailed profile view of a selected entity
 *
 * Behavior:
 * - Uses `useParams` to get an optional `id` from the URL
 * - Fetches entity list and single entity details using React Query
 * - Shows a loading spinner while fetching data
 * - Conditionally renders:
 *   - AdminTableRefactor: when no ID is present (listing view)
 *   - AdminProfileDetailsRefactor: when an ID is present (details view)
 *
 * Context Providers:
 * - AdminTableGlobalProvider: shares table state globally
 * - AdminProfileDetailsGlobalProvider: shares profile-specific state
 *
 * Dependencies:
 * - React Query for data fetching and caching
 * - TailwindCSS for layout and styling
 */

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
import { fetchAdminEntityDetails } from '../../../../utils/functions/adminSection/adminMain/fetchAdminEntityDetails';
import { fetchAdminTableDetails } from '../../../../utils/functions/adminSection/adminMain/fetchAdminTableDetails';
import AdminProfileDetailsRefactor from '../../../standaloneComponents/adminSection/adminProfileDetails/newComponents/AdminProfileDetailsRefactor';
import AdminTableRefactor from '../../../standaloneComponents/adminSection/adminTable/newComponents/AdminTableRefactor';
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
    refetchOnMount: true,
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
    enabled: !!entity_id,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  // If the entities or entity is loading, display the loader
  if (isEntitiesLoading || (isEntityLoading && entity_id)) {
    return DNALoader();
  }

  return (
    <main className="w-full h-fit flex p-4 pb-2 bg-gradient-to-r from-white to-gray-200">
      <AdminTableGlobalProvider>
        <div className="hidden h-screen w-1/4 md:block">
          <AdminSideNav />
        </div>

        <div className="w-full md:border-l-2 md:border-solid">
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
