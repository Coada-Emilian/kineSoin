import type { AdminEntityIdOutputProps } from '../../../../../../@types/props/adminProps';
import AdminEntityProfileOutput from '../../AdminEntityProfileOutput';

export default function AdminEntityIdOutput({ id }: AdminEntityIdOutputProps) {
  return (
    <AdminEntityProfileOutput
      label="ID"
      value={id ? id.toString() : undefined}
    />
  );
}
