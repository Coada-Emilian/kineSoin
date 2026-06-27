import type { AdminTableTitleProps } from '../../../../@types/props/adminProps';

export const getAdminTableTitleContent = ({
  tableTitle,
  entityStatus,
}: AdminTableTitleProps) => {
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
