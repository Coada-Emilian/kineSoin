interface FunctionProps {
  tableTitle: string;
  entityStatus: string;
}

export const getAdminTableTitleContent = ({
  tableTitle,
  entityStatus,
}: FunctionProps) => {
  if (!entityStatus) {
    return tableTitle;
  } else if (entityStatus === 'active') {
    return `${tableTitle} actifs`;
  } else if (entityStatus === 'inactive') {
    return `${tableTitle} inactifs`;
  } else if (entityStatus === 'banned') {
    return `${tableTitle} bannis`;
  } else if (entityStatus === 'pending') {
    return `${tableTitle} en attente`;
  } else if (entityStatus === 'operated') {
    return `${tableTitle} opérées`;
  } else if (entityStatus === 'non-operated') {
    return `${tableTitle} non-opérées`;
  } else {
    return `${tableTitle}`;
  }
};
