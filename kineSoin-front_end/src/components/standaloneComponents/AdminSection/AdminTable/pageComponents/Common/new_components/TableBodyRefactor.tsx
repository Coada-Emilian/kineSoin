import {
  IAffliction,
  IBodyRegion,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../../../../@types/standardInterfaces';
import { getAdminEntityTableBodies } from '../../../../../../../utils/componentUtils/pageComponents/functions/adminSection/AdminTable/getAdminEntityTableBodies';

interface TableBodyRefactorProps {
  renderedEntities:
    | ITherapist[]
    | IPatient[]
    | IAffliction[]
    | IMedic[]
    | IInsurance[];
  entityType: string;
}

export default function TableBodyRefactor({
  renderedEntities,
  entityType,
}: TableBodyRefactorProps) {
  const entityTableBodies = getAdminEntityTableBodies({
    renderedEntities,
  });

  const currentEntity = entityTableBodies.find(
    (entity) => entity.entityType === entityType
  );

  return (
    <tbody className="xxs:text-xs xs:text-xs md:text-sm">
      {currentEntity && currentEntity.component}
    </tbody>
  );
}
