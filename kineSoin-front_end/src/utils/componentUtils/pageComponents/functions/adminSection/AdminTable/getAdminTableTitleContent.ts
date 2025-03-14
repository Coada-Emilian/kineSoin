/**
 * getAdminTableTitleContent Function
 *
 * This function dynamically generates a table title based on the provided `tableTitle` and `entityStatus` values.
 * It appends a status suffix to the `tableTitle` to indicate the current state or condition of the entities being displayed.
 * The status suffixes are predefined for common entity statuses such as active, inactive, banned, pending, operated, and non-operated.
 * 
 * **Main Features:**
 * - Appends a status suffix to the base table title, such as "active", "inactive", "banned", etc.
 * - If no matching status is found, it returns just the `tableTitle` without any suffix.
 * - Ensures that the title is formatted correctly by trimming any unnecessary spaces.

 * **Parameters:**
 * - `tableTitle` (`string`): The base title for the table (e.g., "All therapists", "All patients").
 * - `entityStatus` (`string`): The current status of the entity (e.g., 'active', 'inactive', 'pending'). This determines the suffix that will be added to the table title.
 * 
 * **Returns:**
 * - A string containing the full table title with the appropriate status suffix (if any).
 * - If no status is provided, it returns the original `tableTitle` without modification.
 * 
 * **Usage Example:**
 * ```ts
 * getAdminTableTitleContent({ tableTitle: 'All therapists', entityStatus: 'active' });
 * ```
 * This would return: `"All therapists actifs"`.
 *
 * **Status Suffixes:**
 * - `active` => 'actifs'
 * - `inactive` => 'inactifs'
 * - `banned` => 'bannis'
 * - `pending` => 'en attente'
 * - `operated` => 'opérées'
 * - `non-operated` => 'non-opérées'
 * 
 * If the `entityStatus` does not match one of the predefined statuses, the function simply returns the original `tableTitle`.

 * **Important Notes:**
 * - The function trims extra spaces using `.trim()` to ensure that no unwanted spaces are included in the title.
 * - This function is useful for generating dynamic titles in an admin interface, where the displayed content varies based on the status of entities.
 */

interface FunctionProps {
  tableTitle: string;
  entityStatus: string;
}

export const getAdminTableTitleContent = ({
  tableTitle,
  entityStatus,
}: FunctionProps) => {
  const statusSuffixes: Record<string, string> = {
    active: 'actifs',
    inactive: 'inactifs',
    banned: 'bannis',
    pending: 'en attente',
    operated: 'opérées',
    'non-operated': 'non-opérées',
  };

  return entityStatus
    ? `${tableTitle} ${statusSuffixes[entityStatus] || ''}`.trim()
    : tableTitle;
};
