import type { AdminEntityStatusOutputProps } from '../../../../../../@types/props/adminProps';
import { getEntityStatusClassName } from '../../../../../../utils/functions/admin/adminEntityProfile/getEntityStatusClassName';
import { getEntityStatusText } from '../../../../../../utils/functions/admin/adminEntityProfile/getEntityStatusText';
import statusIcon from '/icons/approve.png';

export default function AdminEntityStatusOutput({
  status,
}: AdminEntityStatusOutputProps) {
  if (!status) {
    return null;
  }

  const entityStatus = getEntityStatusText(status);

  return (
    <>
      <div className="flex items-center gap-2 mb-2">
        <img src={statusIcon} alt="status" className="h-4 w-4 md:h-6 md:w-6" />
        <div className="text-sm md:text-md lg:text-lg xl:text-xl">
          <div className="flex gap-3 items-center ">
            <h4 className="font-bold">Statut : </h4>
            <span
              className={`${getEntityStatusClassName(entityStatus)} py-1 px-2 rounded-xl font-semibold `}
            >
              {entityStatus}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
