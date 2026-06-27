import type { AdminEntityEmailOutputProps } from '../../../../../../@types/props/adminProps';
import AdminEntityProfileOutput from '../../AdminEntityProfileOutput';

export default function AdminEntityEmailOutput({
  email,
}: AdminEntityEmailOutputProps) {
  return <AdminEntityProfileOutput label="E-mail" value={email} />;
}
