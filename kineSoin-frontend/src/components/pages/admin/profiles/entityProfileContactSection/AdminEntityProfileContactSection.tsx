import type { AdminPageProps } from '../../../../../@types/props/adminProps';
import { useAdminEntityProfileContext } from '../../../../../utils/hooks/context/useAdminEntityProfileContext';
import AdminEntityProfileContactSectionInputs from './inputs/AdminEntityProfileContactSectionInputs';
import AdminEntityProfileContactSectionOutputs from './outputs/AdminEntityProfileContactSectionOutputs';

export default function AdminEntityProfileContactSection({
  entityType,
}: AdminPageProps) {
  // Get the global context for profile editing state
  const { isProfileEditing } = useAdminEntityProfileContext();

  return (
    <section className="mb-2 w-full space-y-3">
      {isProfileEditing && entityType !== 'patient' ? (
        <AdminEntityProfileContactSectionInputs entityType={entityType} />
      ) : (
        <AdminEntityProfileContactSectionOutputs />
      )}
    </section>
  );
}
