/**
 * @component AddressOutputRefactor
 *
 * Displays a full address composed of street number, street name, postal code, and city
 * using the BaseOutput component. Returns null if any part of the address is missing.
 *
 * @param {Object} props
 * @param {string | undefined} props.street_number - The street number.
 * @param {string | undefined} props.street_name - The street name.
 * @param {string | undefined} props.postal_code - The postal code.
 * @param {string | undefined} props.city - The city name.
 *
 * @returns {JSX.Element | null} The rendered address output or null if any field is missing.
 *
 * @example
 * <AddressOutputRefactor
 *   street_number="12"
 *   street_name="Rue de Paris"
 *   postal_code="75001"
 *   city="Paris"
 * />
 */

import BaseOutput from '../../../../generalComponents/BaseOutput';

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
