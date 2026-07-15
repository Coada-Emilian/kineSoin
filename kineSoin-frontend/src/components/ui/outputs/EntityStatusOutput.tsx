import type { EntityStatusOutputProps } from '../../../@types/props/componentProps';
import { getEntityStatusClassName } from '../../../utils/functions/getEntityStatusClassName';
import { getEntityStatusText } from '../../../utils/functions/getEntityStatusText';
import statusIcon from '/icons/approve.png';

export default function EntityStatusOutput({
  status,
  isLabelMissing,
}: EntityStatusOutputProps) {
  if (!status) {
    return null;
  }

  const entityStatus = getEntityStatusText(status);

  return (
    <div className="flex items-center gap-2 mb-2">
      {isLabelMissing ? (
        <div
          className={`${getEntityStatusClassName(entityStatus)} flex  gap-3 items-center py-1 px-2 rounded-xl`}
        >
          <img
            src={statusIcon}
            alt="status"
            className="h-4 w-4 md:h-6 md:w-6"
          />
          <span className="font-semibold">{entityStatus}</span>
        </div>
      ) : (
        <>
          <img
            src={statusIcon}
            alt="status"
            className="h-4 w-4 md:h-6 md:w-6"
          />
          <div className="flex gap-3 items-center ">
            <h4 className="font-bold">Statut : </h4>
            <span
              className={`${getEntityStatusClassName(entityStatus)} py-1 px-2 rounded-xl font-semibold `}
            >
              {entityStatus}
            </span>
          </div>{' '}
        </>
      )}
    </div>
  );
}
