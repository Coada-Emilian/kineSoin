interface TableTitleRefactorProps {
  tableTitle: string;
  entityStatus: string;
}

export default function TableTitleRefactor({
  tableTitle,
  entityStatus,
}: TableTitleRefactorProps) {
  const getContent = () => {
    if (!entityStatus) {
      return tableTitle;
    } else if (entityStatus && entityStatus === 'all') {
      return `${tableTitle}`;
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
      return '';
    }
  };

  return (
    <h2 className="text-center md:text-2xl font-semibold mb-4 md:text-left ml-10">
      {getContent()}
    </h2>
  );
}
