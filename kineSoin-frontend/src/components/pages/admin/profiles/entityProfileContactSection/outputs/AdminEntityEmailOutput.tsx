import type { AdminEntityEmailOutputProps } from '../../../../../../@types/props/adminProps';
import AdminEntityProfileInfoOutput from './AdminOutputContainer';
import readIcon from '/icons/envelope.png';

export default function AdminEntityEmailOutput({
  email,
}: AdminEntityEmailOutputProps) {
  return (
    <>
      <AdminEntityProfileInfoOutput
        icon={readIcon}
        iconAlt="email"
        label="Email"
        value={email as string}
      ></AdminEntityProfileInfoOutput>
    </>
  );
}
