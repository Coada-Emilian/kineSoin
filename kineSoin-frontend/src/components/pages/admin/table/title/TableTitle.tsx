import type { AdminTableTitleProps } from '../../../../../@types/props/adminProps';
import { getAdminTableTitleContent } from '../../../../../utils/functions/admin/adminTable/getAdminTableTitleContent';

export default function TableTitle({
  tableTitle,
  entityStatus,
  tableSubtitle,
}: AdminTableTitleProps) {
  return (
    <>
      <h1
        className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-slate-800 leading-tight
    wrap-break-word"
      >
        {getAdminTableTitleContent({ tableTitle, entityStatus })}
      </h1>

      <p className="mt-2 text-sm text-slate-500">{tableSubtitle}</p>
    </>
  );
}
