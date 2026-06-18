import type { TableTitleProps } from '../../../../../@types/props/customProps';
import { getAdminTableTitleContent } from '../../../../../utils/functions/admin/adminTable/getAdminTableTitleContent';

export default function TableTitle({
  tableTitle,
  entityStatus,
}: TableTitleProps) {
  return (
    <h2 className="mb-4 text-xl md:text-2xl font-semibold text-primaryBlue">
      {getAdminTableTitleContent({ tableTitle, entityStatus })}
    </h2>
  );
}
