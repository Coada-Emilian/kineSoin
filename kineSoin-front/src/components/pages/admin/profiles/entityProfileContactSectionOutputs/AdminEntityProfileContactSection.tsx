import type { BaseAdminEntityProfileProps } from '../../../../../@types/props/adminProps';
import { useAdminEntityProfileContext } from '../../../../../utils/functions/contextUtils/useAdminEntityProfileCOntext';

export default function AdminEntityProfileContactSection({
  entityType,
}: BaseAdminEntityProfileProps) {
  // Determine if the entity type is 'patient'
  const isPatientProfile = entityType === 'patient';

  // Get the global context for profile editing state
  const { isProfileEditing } = useAdminEntityProfileContext();

  return (
    <section className="mb-2 md:text-2xl w-full">
      {!isProfileEditing || isPatientProfile ? (
        <ProfileSectionOutputs />
      ) : (
        <ProfileSectionInputs entityType={entityType} />
      )}
    </section>
  );
}
