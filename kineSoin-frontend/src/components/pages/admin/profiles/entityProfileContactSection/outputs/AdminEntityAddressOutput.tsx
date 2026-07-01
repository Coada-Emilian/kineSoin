import type { AdminEntityAddressOutputProps } from '../../../../../../@types/props/adminProps';
import AdminEntityProfileInfoOutput from './AdminOutputContainer';
import addressIcon from '/icons/address.png';

export default function AdminEntityAddressOutput({
  street_number,
  street_name,
  postal_code,
  city,
}: AdminEntityAddressOutputProps) {
  if (street_number && street_name && postal_code && city) {
    const fullAddress = `${street_number} ${street_name}, ${postal_code} ${city}`;

    return (
      <AdminEntityProfileInfoOutput
        icon={addressIcon}
        iconAlt="adresse"
        label="Adresse"
        value={fullAddress as string}
      ></AdminEntityProfileInfoOutput>
    );
  } else {
    return null;
  }
}
