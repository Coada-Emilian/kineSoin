import { getAdminTableTitleContent } from '../../../../../../../utils/functions/adminSection/adminTable/getAdminTableTitleContent';

interface TableTitleRefactorProps {
  tableTitle: string;
  entityStatus: string;
}

export default function TableTitleRefactor({
  tableTitle,
  entityStatus,
}: TableTitleRefactorProps) {
  return (
    <h2 className="text-center md:text-2xl font-semibold mb-4 md:text-left ml-10">
      {getAdminTableTitleContent({ tableTitle, entityStatus })}
    </h2>
  );
}
