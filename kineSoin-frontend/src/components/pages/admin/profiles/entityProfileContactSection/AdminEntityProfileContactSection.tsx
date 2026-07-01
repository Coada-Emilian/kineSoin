import type { AdminPageProps } from '../../../../../@types/props/adminProps';
import { useAdminEntityProfileContext } from '../../../../../utils/functions/contextUtils/useAdminEntityProfileContext';
import AdminEntityProfileContactSectionInputs from './inputs/AdminEntityProfileContactSectionInputs';
import AdminEntityProfileContactSectionOutputs from './outputs/AdminEntityProfileContactSectionOutputs';

export default function AdminEntityProfileContactSection({
  entityType,
}: AdminPageProps) {
  // Get the global context for profile editing state
  const { isProfileEditing } = useAdminEntityProfileContext();

  return (
    <section className="mb-2 md:text-2xl w-full">
      {isProfileEditing && entityType !== 'patient' ? (
        <AdminEntityProfileContactSectionInputs entityType={entityType} />
      ) : (
        <AdminEntityProfileContactSectionOutputs />
      )}
    </section>
  );
}
