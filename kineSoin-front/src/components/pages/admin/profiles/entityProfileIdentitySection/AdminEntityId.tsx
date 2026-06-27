import type { AdminEntityIdProps } from '../../../../../@types/props/componentProps';
import AdminEntityProfileOutput from './AdminEntityProfileOutput';

export default function AdminEntityId({ id }: AdminEntityIdProps) {
  return (
    <AdminEntityProfileOutput
      label="ID"
      value={id ? id.toString() : undefined}
    />
  );
}
