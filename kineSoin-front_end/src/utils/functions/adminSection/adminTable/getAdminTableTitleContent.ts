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
