import type { AdminEntityEmailProps } from '../../../../../../@types/props/adminProps';
import AdminEntityProfileOutput from '../../AdminEntityProfileOutput';

export default function EmailOutputRefactor({ email }: AdminEntityEmailProps) {
  return <AdminEntityProfileOutput label="E-mail" value={email} />;
}
