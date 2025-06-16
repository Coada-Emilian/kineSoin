import { ITableBodyRefactorProps } from '../../../../../../../@types/interfaces/customInterfaces';
import { getAdminTableBodyContent } from '../../../../../../../utils/functions/component_utils/page_components/admin_table/getAdminTableBodyContent';

export default function TableBodyRefactor({
  renderedEntities,
  entityType,
}: ITableBodyRefactorProps) {
  // Get the table bodies for the entities
  const entityTableBodies = getAdminTableBodyContent({
    renderedEntities,
  });

  // Find the current entity
  const currentEntity = entityTableBodies.find(
    (entity) => entity.entityType === entityType
  );

  return (
    <tbody className="xxs:text-xs xs:text-xs md:text-sm">
      {currentEntity && currentEntity.component}
    </tbody>
  );
}
