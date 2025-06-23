/**
 * @function TableBodyRefactor
 *
 * A React functional component that renders the body section of an admin table.
 * It receives a list of rendered entities and an entity type, then selects and displays
 * the corresponding table body content for that entity type.
 *
 * @param renderedEntities - An array of entities that have been rendered, each with associated data and components.
 * @param entityType - A string representing the current entity type to display (e.g., "therapist", "patient").
 *
 * @returns {JSX.Element} - A table body element containing rows relevant to the selected entity type.
 *
 * @example
 * <TableBodyRefactor renderedEntities={entities} entityType="patient" />
 *
 * @remarks
 * - Uses the utility function `getAdminTableBodyContent` to get structured table body content.
 * - Applies responsive font sizes using Tailwind CSS classes.
 */

import { ITableBodyRefactorProps } from '../../../../../../../@types/interfaces/customInterfaces';
import { getAdminTableBodyContent } from '../../../../../../../utils/functions/adminSection/adminTable/getAdminTableBodyContent';

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
