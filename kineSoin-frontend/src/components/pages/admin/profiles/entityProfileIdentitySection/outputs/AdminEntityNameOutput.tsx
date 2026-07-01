import type { AdminEntityNameOutputProps } from '../../../../../../@types/props/adminProps';
import AdminEntityProfileOutput from '../../AdminEntityProfileOutput';

export default function AdminEntityNameOutput({
  name,
  surname,
}: AdminEntityNameOutputProps) {
  const full_name = name && surname ? `${name} ${surname}` : name;

  return <AdminEntityProfileOutput label="Nom" value={full_name} />;
}
