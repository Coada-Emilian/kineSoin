import BaseOutput from './BaseOutput';

interface AddressOutputRefactorProps {
  city: string | undefined;
  postal_code: string | undefined;
  street_number: string | undefined;
  street_name: string | undefined;
}

export default function AddressOutputRefactor({
  street_number,
  street_name,
  postal_code,
  city,
}: AddressOutputRefactorProps) {
  if (street_number && street_name && postal_code && city) {
    const fullAddress = `${street_number} ${street_name}, ${postal_code} ${city}`;
    return <BaseOutput value={fullAddress} label="Adresse" />;
  } else {
    return null;
  }
}
