import type { AdminEntityAddressOutputProps } from '../../../../../../@types/props/adminProps';
import AdminEntityProfileOutput from '../../AdminEntityProfileOutput';

export default function AdminEntityAddressOutput({
  street_number,
  street_name,
  postal_code,
  city,
}: AdminEntityAddressOutputProps) {
  if (street_number && street_name && postal_code && city) {
    const fullAddress = `${street_number} ${street_name}, ${postal_code} ${city}`;

    return <AdminEntityProfileOutput value={fullAddress} label="Adresse" />;
  } else {
    return null;
  }
}
