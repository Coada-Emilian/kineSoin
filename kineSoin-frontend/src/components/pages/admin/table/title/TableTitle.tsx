import type { AdminTableTitleProps } from '../../../../../@types/props/adminProps';
import { getAdminTableTitleContent } from '../../../../../utils/functions/admin/adminTable/getAdminTableTitleContent';

export default function TableTitle({
  tableTitle,
  entityStatus,
}: AdminTableTitleProps) {
  return (
    <h2 className="mb-4 text-base md:text-2xl font-semibold text-primaryBlue italic">
      {getAdminTableTitleContent({ tableTitle, entityStatus })}
    </h2>
  );
}
