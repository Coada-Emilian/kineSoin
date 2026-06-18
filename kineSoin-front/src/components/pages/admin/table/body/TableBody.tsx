import type { TableBodyProps } from '../../../../../@types/props/customProps';
import { getAdminTableBodyContent } from '../../../../../utils/functions/admin/adminTable/getAdminTableBodyContent';

export default function TableBodyRefactor({
  renderedEntities,
  entityType,
}: TableBodyProps) {
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
