/**
 * TableBodyRefactor Component
 *
 * This component is responsible for rendering the body of the admin table based on the provided entities. It accepts a list of
 * entities and dynamically generates table rows using the appropriate component based on the `entityType`. The entities
 * can be of various types, including `Therapist`, `Patient`, `Affliction`, `Medic`, or `Insurance`. The component utilizes
 * a helper function to determine how the table rows should be rendered for each entity type.
 *
 * **Main Features:**
 * - Dynamically renders the table body based on the type of entities passed to it (e.g., therapists, patients, etc.).
 * - Uses the `getAdminEntityTableBodies` function to fetch the correct table body component for each entity type.
 * - Only renders the component for the current entity type, based on the provided `entityType` prop.
 * - Ensures that the correct table rows are displayed based on the entity type, allowing for flexibility in the admin interface.
 * - Provides responsive styling for smaller and larger screens with appropriate text sizes (`xxs:text-xs`, `xs:text-xs`, `md:text-sm`).
 * 
 * **Parameters:**
 * - `renderedEntities` (`ITherapist[] | IPatient[] | IAffliction[] | IMedic[] | IInsurance[]`): An array of entities to be rendered as table rows. The type of entities can vary, and this array is passed to determine how to render the table body.
 * - `entityType` (`string`): A string representing the type of entity for which the table body is being rendered (e.g., "therapist", "patient", etc.).
 * 
 * **Returns:**
 * - A JSX element representing the `tbody` of a table. It contains the correct table rows for the given `entityType`, as determined by the `getAdminEntityTableBodies` function.
 * 
 * **Usage Example:**
 * ```tsx
 * <TableBodyRefactor
 *   renderedEntities={therapists}  // Array of therapists
 *   entityType="therapist"         // Entity type to render
 * />
 * ```
 * This will render the table body for the therapist entities, with each row corresponding to a therapist.

 * **Important Notes:**
 * - The `getAdminEntityTableBodies` function is used to map the `renderedEntities` to their respective table body components.
 * - The component will render the body of the table for the entity type provided. If `entityType` is "therapist", it will display the table rows for therapists, and similarly for other entity types.
 * - The `xxs:text-xs`, `xs:text-xs`, and `md:text-sm` CSS classes control the text size for different screen sizes, ensuring readability across devices.
 * 
 * **CSS Classes and Layout:**
 * - `xxs:text-xs`, `xs:text-xs`, `md:text-sm`: Adjusts the text size for small (`xxs`), extra small (`xs`), and medium (`md`) screen sizes.
 * - The `tbody` element is rendered inside a table with a consistent and responsive layout, adapting to different screen sizes.
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
