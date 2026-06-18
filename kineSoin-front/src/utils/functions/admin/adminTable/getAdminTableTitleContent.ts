import type { TableTitleProps } from '../../../../@types/props/customProps';

export const getAdminTableTitleContent = ({
  tableTitle,
  entityStatus,
}: TableTitleProps) => {
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
