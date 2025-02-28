import {
  IAffliction,
  IBodyRegion,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../../../../@types/standardTypes';
import { getAdminEntityTableBodies } from '../../../../../../../utils/componentUtils/pageComponents/functions/adminSection/AdminTable/getAdminEntityTableBodies';

interface TableBodyRefactorProps {
  renderedEntities:
    | ITherapist[]
    | IPatient[]
    | IAffliction[]
    | IMedic[]
    | IInsurance[];
  entityType: string;
  openDeleteModal: (
    entity:
      | ITherapist
      | IPatient
      | IAffliction
      | IMedic
      | IInsurance
      | IBodyRegion
  ) => void;
}

export default function TableBodyRefactor({
  renderedEntities,
  entityType,
  openDeleteModal,
}: TableBodyRefactorProps) {
  const entityTableBodies = getAdminEntityTableBodies({
    renderedEntities,
    openDeleteModal,
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
