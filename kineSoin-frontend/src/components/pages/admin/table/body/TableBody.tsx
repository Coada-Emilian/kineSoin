import type { AdminTableBodyProps } from '../../../../../@types/props/adminProps';
import { getAdminTableBodyContent } from '../../../../../utils/functions/admin/adminTable/getAdminTableBodyContent';

export default function TableBody({
  renderedEntities,
  entityType,
}: AdminTableBodyProps) {
  // Get the table bodies for the entities
  const entityTableBodies = getAdminTableBodyContent({
    renderedEntities,
  });

  // Find the current entity
  const currentEntity = entityTableBodies.find(
    (entity) => entity.entityType === entityType
  );

  return (
    <tbody className="text-xs md:text-sm bg-gray-50 text-gray-700 font-medium">
      {currentEntity && currentEntity.component}
    </tbody>
  );
}
