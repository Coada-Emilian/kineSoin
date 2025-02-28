import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SideNav from '../../standaloneComponents/generalComponents/SideNav/SideNav';
import DNALoader from '../../../utils/DNALoader';
import {
  ITherapist,
  IPatient,
  IAffliction,
  IMedic,
  IInsurance,
} from '../../../@types/standardTypes';
import {
  fetchDetailsDataRefactor,
  fetchTableDataRefactor,
} from '../../../utils/pageUtils/AdminSection/AdminMainUtils/adminMainUtilsRefactor';
import AdminTableRefactor from '../../standaloneComponents/AdminSection/AdminTable/AdminTableRefactor';
import AdminProfileDetailsRefactor from '../../standaloneComponents/AdminSection/AdminProfileDetails/AdminProfileDetailsRefactor';

interface AdminMain2Props {
  entityType: string;
  entities: ITherapist[] | IPatient[] | IAffliction[] | IMedic[] | IInsurance[];
  setEntities:
    | React.Dispatch<React.SetStateAction<ITherapist[]>>
    | React.Dispatch<React.SetStateAction<IPatient[]>>
    | React.Dispatch<React.SetStateAction<IAffliction[]>>
    | React.Dispatch<React.SetStateAction<IMedic[]>>
    | React.Dispatch<React.SetStateAction<IInsurance[]>>;
  entity: ITherapist | IPatient | IAffliction | IMedic | IInsurance | null;
  setEntity:
    | React.Dispatch<React.SetStateAction<ITherapist>>
    | React.Dispatch<React.SetStateAction<IPatient>>
    | React.Dispatch<React.SetStateAction<IAffliction>>
    | React.Dispatch<React.SetStateAction<IMedic>>
    | React.Dispatch<React.SetStateAction<IInsurance>>
    | React.Dispatch<React.SetStateAction<any | null>>;
  entityId: number | undefined | null;
  setEntityId: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function AdminMain2({
  entityType,
  entities,
  setEntities,
  entity,
  setEntity,
  entityId,
  setEntityId,
}: AdminMain2Props) {
  //  Get the id from the URL
  const { id } = useParams();
  const entity_id = id ? parseInt(id, 10) : null;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fetch the data of the entity to be displayed
  useEffect(() => {
    {
      setEntityId(id ? entity_id : null);
    }
  }, [id]);

  // Fetch all the data to be displayed in the table
  useEffect(() => {
    fetchTableDataRefactor({
      setIsLoading,
      entityType,
      setEntities,
    });
  }, [entityType]);

  if (isLoading) {
    return DNALoader();
  }

  //   Fetch the data of the entity to be displayed
  useEffect(() => {
    fetchDetailsDataRefactor({
      setIsLoading,
      entityType,
      entityId,
      setEntity,
    });
  }, [entityId]);

  return (
    <main className="w-full h-fit bg-gradient-to-r from-white to-gray-200 pb-2 flex p-4">
      <div className="w-1/4 h-screen hidden md:block">
        <SideNav isAdminSideNav />
      </div>

      <div className="w-full md:border-l-2 md:border-solid ">
        {entities.length > 0 && !id && (
          <AdminTableRefactor
            entities={entities}
            entityType={entityType}
            entity={entity}
          />
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
