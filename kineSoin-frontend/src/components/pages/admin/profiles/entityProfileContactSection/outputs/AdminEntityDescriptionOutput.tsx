import type { AdminEntityDescriptionOutputProps } from '../../../../../../@types/props/adminProps';
import AdminEntityProfileOutput from '../../AdminEntityProfileOutput';

export default function AdminEntityDescriptionOutput({
  description,
}: AdminEntityDescriptionOutputProps) {
  return (
    <AdminEntityProfileOutput
      value={description}
      label="Description"
      isTextArea
    />
  );
}
