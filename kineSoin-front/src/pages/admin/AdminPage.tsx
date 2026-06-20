import { useParams } from 'react-router-dom';
import type { AdminPageProps } from '../../@types/props/customProps';
import AdminSideNavbar from '../../components/pages/admin/AdminSideNavbar';
import AdminTable from '../../components/pages/admin/table/AdminTable';
import DNALoader from '../../components/ui/DNALoader';
import { AdminContextProvider } from '../../contexts/AdminContext/AdminContext';
import { useFetchAdminEntityDetails } from '../../utils/hooks/admin/useFetchAdminEntityDetails';
import { useFetchAdminTableDetails } from '../../utils/hooks/admin/useFetchAdminTableDetails';

export default function AdminMain({ entityType }: AdminPageProps) {
  // Get the id from the URL
  const { id } = useParams();

  // Parse the id to an integer
  const entity_id = id ? parseInt(id, 10) : null;

  const { data: entity, isFetching: isEntityLoading } =
    useFetchAdminEntityDetails({
      entityType,
      entity_id,
    });

  const { data: entities, isFetching: isEntitiesLoading } =
    useFetchAdminTableDetails({
      entityType,
    });

  if (isEntitiesLoading || isEntityLoading) {
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
