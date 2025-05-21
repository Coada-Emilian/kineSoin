/**
 * @function TableTitleRefactor
 *
 * A component that renders the title of the admin table, formatted based on the entity type and current status.
 * It uses the `getAdminTableTitleContent` utility function to fetch the appropriate title content.
 *
 * @param tableTitle - The title to be displayed for the table.
 * @param entityStatus - The current status of the entities (e.g., active, inactive) to modify the title content accordingly.
 *
 * @returns {JSX.Element} - The rendered title of the admin table.
 *
 * @example
 * <TableTitleRefactor tableTitle="Tous les kinésithérapeutes" entityStatus="active" />
 *
 * @remarks
 * - The title will be adjusted based on the `entityStatus` to ensure it reflects the current state of the data.
 * - Typically used in admin interfaces to provide context-specific titles.
 */
import { getAdminTableTitleContent } from '../../../../../../../utils/functions/component_utils/page_components/admin_table/other_functions/getAdminTableTitleContent';

interface TableTitleRefactorProps {
  tableTitle: string;
  entityStatus: string;
}

export default function TableTitleRefactor({
  tableTitle,
  entityStatus,
}: TableTitleRefactorProps) {
  return (
    <h2 className="text-center md:text-2xl font-semibold mb-4 md:text-left ml-10">
      {getAdminTableTitleContent({ tableTitle, entityStatus })}
    </h2>
  );
}
