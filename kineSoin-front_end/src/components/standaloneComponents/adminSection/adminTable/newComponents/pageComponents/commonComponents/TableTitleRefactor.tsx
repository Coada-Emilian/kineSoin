/**
 * @function TableTitleRefactor
 *
 * A functional component that renders the title of an admin table with dynamic content.
 * It displays a heading that adapts based on the current table title and the status of the entities.
 *
 * @param {object} props - Component props
 * @param {string} props.tableTitle - The main title of the table to display.
 * @param {string} props.entityStatus - The current status filter applied to the entities, which affects the displayed title content.
 *
 * @returns {JSX.Element} - A styled heading element containing the formatted table title content.
 *
 * @example
 * <TableTitleRefactor tableTitle="Tous les kinésithérapeutes" entityStatus="active" />
 *
 * @remarks
 * - Uses the `getAdminTableTitleContent` utility function to generate the title text dynamically based on props.
 * - Tailwind CSS classes are applied for responsive text sizing, font weight, margins, and alignment.
 */

import { getAdminTableTitleContent } from '../../../../../../../utils/functions/adminSection/adminTable/getAdminTableTitleContent';

interface TableTitleRefactorProps {
  tableTitle: string;
  entityStatus: string;
}

export default function TableTitleRefactor({
  tableTitle,
  entityStatus,
}: TableTitleRefactorProps) {
  return (
    <h2 className="ml-10 mb-4 text-center md:text-left md:text-2xl font-semibold">
      {getAdminTableTitleContent({ tableTitle, entityStatus })}
    </h2>
  );
}
