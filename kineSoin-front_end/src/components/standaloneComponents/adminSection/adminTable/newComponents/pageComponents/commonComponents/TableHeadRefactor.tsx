/**
 * @function TableHeadRefactor
 *
 * A React functional component that renders the header section of an admin table.
 * It displays column headers with dynamic content for the second, third, and optionally fourth columns.
 * The first column is fixed as an ID column, and the last column spans two cells for actions.
 *
 * @param secondHeaderContent - Text content for the second column header.
 * @param thirdHeaderContent - Text content for the third column header.
 * @param fourthHeaderContent - Optional text content for the fourth column header, which is hidden on small screens and shown on medium and larger screens.
 *
 * @returns {JSX.Element} - A table head element containing a single row of table headers.
 *
 * @example
 * <TableHeadRefactor
 *   secondHeaderContent="Name"
 *   thirdHeaderContent="Status"
 *   fourthHeaderContent="Region"
 * />
 *
 * @remarks
 * - The component uses Tailwind CSS classes for styling and responsive design.
 * - Borders, padding, text alignment, and rounded corners are applied for better UI.
 * - The fourth header cell is conditionally rendered and responsive.
 */

interface TableHeadRefactorProps {
  secondHeaderContent: string;
  thirdHeaderContent: string;
  fourthHeaderContent?: string;
}

export default function TableHeadRefactor({
  secondHeaderContent,
  thirdHeaderContent,
  fourthHeaderContent,
}: TableHeadRefactorProps) {
  return (
    <thead className="bg-gray-100 xxs:text-xs text-sm md:text-base">
      <tr>
        <>
          <th className="border border-gray-300 px-4 py-2 text-center rounded-tl-2xl w-1/12">
            #id
          </th>

          <th className="border border-gray-300 px-4 py-2 text-center">
            {secondHeaderContent}
          </th>

          <th className="border border-gray-300 px-4 py-2 text-center">
            {thirdHeaderContent}
          </th>

          {fourthHeaderContent && (
            <th className="border border-gray-300 px-4 py-2 text-center hidden md:table-cell  ">
              {fourthHeaderContent}
            </th>
          )}

          <th
            className="border border-gray-300 px-4 py-2 text-center rounded-tr-2xl"
            colSpan={2}
          >
            Action
          </th>
        </>
      </tr>
    </thead>
  );
}
