import type { AdminEntityIdProps } from '../../../../../@types/props/adminProps';
import AdminEntityProfileOutput from './AdminEntityProfileOutput';

export default function AdminEntityId({ id }: AdminEntityIdProps) {
  return (
    <AdminEntityProfileOutput
      label="ID"
      value={id ? id.toString() : undefined}
    />
  );
}
