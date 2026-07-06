import type { AdminPageProps } from '../../../../../@types/props/adminProps';
import { useAdminEntityProfileContext } from '../../../../../hooks/context/admin/useAdminEntityProfileContext';
import AdminEntityProfileContactSectionInputs from './AdminEntityProfileContactSectionInputs';
import AdminEntityProfileContactSectionOutputs from './EntityProfileContactSectionOutputs';

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
