/**
 * TableHeadRefactor Component
 *
 * This component renders the table header with dynamic column headers. It accepts properties to customize the content
 * of the table's header cells, including optional columns. The table structure is responsive and adapts based on the
 * provided content, with specific behavior for smaller and larger screen sizes.
 *
 * **Main Features:**
 * - Dynamically renders a table header with customizable columns (`secondHeaderContent`, `thirdHeaderContent`, and optionally `fourthHeaderContent`).
 * - The `fourthHeaderContent` is conditionally rendered based on its presence and only visible on larger screens (`md` and above).
 * - The first and last columns are static, with the first column displaying an ID and the last column reserved for "Action" buttons.
 * - The table header is styled for a clean, responsive layout with proper spacing, borders, and text alignment.
 *
 * **Parameters:**
 * - `secondHeaderContent` (`string`): The content to be displayed in the second column header (e.g., "Name", "Status").
 * - `thirdHeaderContent` (`string`): The content to be displayed in the third column header (e.g., "Type", "Date").
 * - `fourthHeaderContent` (`string`, optional): The content to be displayed in the fourth column header (e.g., "Region", "Role"). This column is conditionally rendered on medium screens and larger.
 *
 * **Returns:**
 * - A JSX element representing a `thead` containing a `tr` with multiple `th` elements. These headers are dynamically rendered based on the provided props.
 * - If `fourthHeaderContent` is provided, an additional `th` is added to the table header, which is hidden on small screens (`xxs` to `md`).
 *
 * **Usage Example:**
 * ```tsx
 * <TableHeadRefactor
 *   secondHeaderContent="Name"
 *   thirdHeaderContent="Status"
 *   fourthHeaderContent="Region"
 * />
 * ```
 * This will render a table header with columns for "ID", "Name", "Status", "Region", and "Action", where the "Region" column
 * will only be visible on medium-sized screens and larger.
 *
 * **Important Notes:**
 * - The first column (`#id`) and the last column (`Action`) are static and do not depend on props.
 * - The table header is responsive, with some columns hidden on smaller screens. Specifically, the `fourthHeaderContent` is
 *   only visible on medium-sized screens (`md`) and larger.
 * - The `Action` column spans two columns to ensure appropriate space for action buttons (e.g., edit, delete).
 *
 * **CSS Classes and Layout:**
 * - `xxs:text-xs`, `md:text-base`, `text-sm`: Adjusts text size based on screen size.
 * - `px-4 py-2`: Adds padding to header cells.
 * - `border border-gray-300`: Adds a border around each header cell.
 * - `text-center`: Centers the text in each header cell.
 * - `hidden md:table-cell`: Hides the `fourthHeaderContent` on smaller screens and displays it on medium screens and above.
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
