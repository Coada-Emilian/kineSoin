/**
 * @function TableBodyRefactor
 *
 * A component that renders the table body dynamically based on the type of entities passed in as props.
 * It renders rows for therapists, patients, afflictions, medications, or insurance entities using the appropriate body components.
 *
 * @param renderedEntities - The list of entities to render in the table body. It can be therapists, patients, afflictions, medicines, or insurance entities.
 * @param entityType - The type of entity (e.g., 'therapist', 'patient', etc.) used to determine which specific table body component to render.
 *
 * @returns {JSX.Element} - A `tbody` element containing rows for the appropriate entity type.
 *
 * @example
 * <TableBodyRefactor
 *   renderedEntities={therapistsList}
 *   entityType="therapist"
 * />
 *
 * @remarks
 * - The function dynamically selects the appropriate component to render the rows for each entity type.
 * - It relies on the `getAdminEntityTableBodies` function to map entity types to their respective rendering components.
 */

import {
  IAffliction,
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
  // Get the table bodies for the entities
  const entityTableBodies = getAdminEntityTableBodies({
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
