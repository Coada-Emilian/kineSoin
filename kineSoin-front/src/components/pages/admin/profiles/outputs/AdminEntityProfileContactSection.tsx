import { useAdminEntityProfileContext } from '../../../../../../utils/functions/contextUtils/useAdminEntityProfileContext';
import AdminEntityProfileContactSectionOutputs from './AdminEntityProfileContactSectionOutputs';

export default function AdminEntityProfileContactSection() {
  // Get the global context for profile editing state
  const { isProfileEditing } = useAdminEntityProfileContext();

  return (
    <section className="mb-2 md:text-2xl w-full">
      {!isProfileEditing ? (
        <AdminEntityProfileContactSectionOutputs />
      ) : (
        <h1>Inputs</h1>
      )}
    </section>
  );
}
