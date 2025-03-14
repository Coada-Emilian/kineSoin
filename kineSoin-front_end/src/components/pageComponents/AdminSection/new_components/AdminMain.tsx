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
  const { id } = useParams();
  const entity_id = id ? parseInt(id, 10) : null;

  const {
    isPending: isEntitiesLoading,
    data: entities,
  } = useQuery({
    queryKey: ['fetchTableDataRefactor', { entityType }],
    queryFn: () => fetchTableDataRefactor<IEntitiesInterfaces>({ entityType }),
  });

  const { isPending: isEntityLoading, data: entity } = useQuery({
    queryKey: ['fetchDetailsDataRefactor', { entityType, entityId: entity_id }],
    queryFn: () =>
      fetchDetailsDataRefactor<IEntityInterface | null>({
        entityType,
        entityId: entity_id,
      }),
  });

  // Fetch all the data to be displayed in the table
  // useEffect(() => {
  //   setLoading(true);
  //   fetchTableDataRefactor<IEntitiesInterfaces>({
  //     entityType,
  //   })
  //     .then((data) => {
  //       if (data) {
  //         setEntities(data);
  //       }
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, [entityType, id]);

  // Fetch the data of the entity to be displayed
  // useEffect(() => {
  //   setLoading(true);
  //   if (entity_id) {
  //     fetchDetailsDataRefactor<IEntityInterface | null>({
  //       entityType,
  //       entityId: entity_id,
  //     })
  //       .then((data) => {
  //         if (data) {
  //           setEntity(data);
  //         }
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });
  //   } else {
  //     setEntity(null);
  //   }
  // }, [entity_id]);

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
