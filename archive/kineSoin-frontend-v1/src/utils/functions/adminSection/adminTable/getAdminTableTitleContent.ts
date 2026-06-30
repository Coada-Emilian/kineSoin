/**
 * @function getAdminTableTitleContent
 *
 * Generates a dynamic table title by appending a status suffix to the base table title.
 * The suffix corresponds to the current entity status, localized in French.
 *
 * @param {object} params - Function parameters
 * @param {string} params.tableTitle - The base title of the table.
 * @param {string} params.entityStatus - The current status of entities to append as a suffix.
 *
 * @returns {string} - The combined table title with an optional status suffix.
 *
 * @example
 * getAdminTableTitleContent({ tableTitle: 'Tous les kinésithérapeutes', entityStatus: 'active' });
 * // Returns "Tous les kinésithérapeutes actifs"
 *
 * @remarks
 * - If the entityStatus is not provided or does not match known statuses, the base title is returned unchanged.
 * - Status suffixes are localized French terms matching specific entity states.
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
