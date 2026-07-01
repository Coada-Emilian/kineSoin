import type { BaseAdminEntityProfileProps } from '../../../../@types/props/adminProps';
import { adminEntityProfileTitleDetails } from '../../../../utils/config/admin/adminEntityProfileTitleDetails';

export default function AdminEntityProfileTitle({
  entityType,
}: BaseAdminEntityProfileProps) {
  const activeEntity = adminEntityProfileTitleDetails.find(
    (entityDetail) => entityDetail.entityType === entityType
  );

  return (
    <div className="flex w-full justify-center">
      <h1 className="text-xl font-semibold tracking-wide text-white sm:text-2xl italic">
        Profil {activeEntity?.title}
      </h1>
    </div>
  );
}
