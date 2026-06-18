import type { TableTitleProps } from '../../../../../@types/props/customProps';
import { getAdminTableTitleContent } from '../../../../../utils/functions/admin/adminTable/getAdminTableTitleContent';

export default function TableTitle({
  tableTitle,
  entityStatus,
}: TableTitleProps) {
  return (
    <h2 className="ml-10 mb-4 text-center md:text-left md:text-2xl font-semibold">
      {getAdminTableTitleContent({ tableTitle, entityStatus })}
    </h2>
  );
}
