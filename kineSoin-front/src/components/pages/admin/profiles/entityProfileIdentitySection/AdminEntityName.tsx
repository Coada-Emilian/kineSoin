import type { AdminEntityNameProps } from '../../../../../@types/props/adminProps';
import AdminEntityProfileOutput from './AdminEntityProfileOutput';

export default function AdminEntityName({
  name,
  surname,
}: AdminEntityNameProps) {
  const full_name = name && surname ? `${name} ${surname}` : name;

  return <AdminEntityProfileOutput label="Nom" value={full_name} />;
}
