import type { AdminEntityTelephoneNumberOutputProps } from '../../../../../../@types/props/adminProps';
import AdminEntityProfileOutput from '../../AdminEntityProfileOutput';

export default function AdminEntityTelephoneNumberOutput({
  prefix,
  phone_number,
}: AdminEntityTelephoneNumberOutputProps) {
  // Combine prefix and phone number
  const full_phone_number =
    prefix && phone_number ? prefix + phone_number : undefined;

  return (
    <AdminEntityProfileOutput value={full_phone_number} label="Téléphone" />
  );
}
