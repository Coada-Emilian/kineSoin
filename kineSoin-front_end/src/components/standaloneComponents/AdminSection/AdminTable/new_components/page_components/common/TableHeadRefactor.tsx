/**
 * @function TableHeadRefactor
 *
 * A component that renders the table header with dynamic column names. It accepts 2-3 header content
 * for the table columns and optionally displays a fourth header if provided.
 *
 * @param secondHeaderContent - The content for the second column header (e.g., name).
 * @param thirdHeaderContent - The content for the third column header (e.g., status).
 * @param fourthHeaderContent - The content for the fourth column header (optional, e.g., region).
 *
 * @returns {JSX.Element} - A `thead` element with the appropriate table headers.
 *
 * @example
 * <TableHeadRefactor
 *   secondHeaderContent="Nom kiné"
 *   thirdHeaderContent="Statut"
 *   fourthHeaderContent="Cotation"
 * />
 *
 * @remarks
 * - The `fourthHeaderContent` is conditionally rendered based on its availability, and is only visible on larger screens (`md:table-cell`).
 * - The table will always include headers for the ID, the entity's name (second column), and the entity's status (third column).
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
