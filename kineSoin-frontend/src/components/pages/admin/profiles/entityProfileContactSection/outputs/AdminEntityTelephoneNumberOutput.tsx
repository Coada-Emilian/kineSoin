import type { AdminEntityTelephoneNumberOutputProps } from '../../../../../../@types/props/adminProps';
import AdminEntityProfileInfoOutput from './AdminOutputContainer';
import phoneIcon from '/icons/smartphone.png';

export default function AdminEntityTelephoneNumberOutput({
  prefix,
  phone_number,
}: AdminEntityTelephoneNumberOutputProps) {
  // Combine prefix and phone number
  const full_phone_number =
    prefix && phone_number ? prefix + phone_number : undefined;

  return (
    <AdminEntityProfileInfoOutput
      icon={phoneIcon}
      iconAlt="telephone"
      label="Téléphone"
      value={full_phone_number as string}
    ></AdminEntityProfileInfoOutput>
  );
}
