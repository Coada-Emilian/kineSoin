import type { AdminEntityStatusProps } from '../../../../../@types/props/componentProps';
import { getEntityStatusClassName } from '../../../../../utils/functions/admin/adminEntityProfile/getEntityStatusClassName';
import { getEntityStatusText } from '../../../../../utils/functions/admin/adminEntityProfile/getEntityStatusText';

export default function AdminEntityStatus({ status }: AdminEntityStatusProps) {
  if (!status) {
    return null;
  }

  const entityStatus = getEntityStatusText(status);

  return (
    <div className="mb-2 text-sm md:text-md lg:text-lg xl:text-xl">
      <div className="flex gap-2 items-center">
        <h4 className="font-bold">Statut: </h4>
        <span
          className={`${getEntityStatusClassName(entityStatus)} py-1 px-2 rounded-xl font-semibold italic`}
        >
          {entityStatus}
        </span>
      </div>
    </div>
  );
}
