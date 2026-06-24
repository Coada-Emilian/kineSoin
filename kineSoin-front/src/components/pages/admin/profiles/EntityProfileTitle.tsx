import type { BaseEntityProfileProps } from '../../../../@types/props/adminProps';
import { adminEntityProfileTitleDetails } from '../../../../utils/constants/admin/adminEntityProfileTitleDetails';

export default function EntityProfileTitle({
  entityType,
}: BaseEntityProfileProps) {
  const activeEntity = adminEntityProfileTitleDetails.find(
    (entityDetail) => entityDetail.entityType === entityType
  );

  return (
    <div className=" font-semibold md:w-full flex justify-center">
      <h1 className=" text-md md:text-lg lg:text-xl xl:text-2xl text-white italic">
        Inspection {activeEntity?.title}
      </h1>
    </div>
  );
}
