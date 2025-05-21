/**
 * @function getAdminTableTitleContent
 *
 * A utility function that generates the title for an admin table, appending the status suffix
 * (e.g., "actifs", "inactifs") to the table title based on the current entity status.
 *
 * @param tableTitle - The title to be displayed for the table.
 * @param entityStatus - The current status of the entities (e.g., active, inactive) to modify the title content accordingly.
 *
 * @returns {string} - The formatted title with the status suffix, or just the table title if no status is provided.
 *
 * @example
 * getAdminTableTitleContent({ tableTitle: 'Tous les kinésithérapeutes', entityStatus: 'active' });
 * // Returns: 'Tous les kinésithérapeutes actifs'
 *
 * @remarks
 * - If the `entityStatus` is not found in the `statusSuffixes` mapping, it returns just the `tableTitle`.
 * - This function is used to create dynamic table titles in the admin dashboard depending on the entity's current status.
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
