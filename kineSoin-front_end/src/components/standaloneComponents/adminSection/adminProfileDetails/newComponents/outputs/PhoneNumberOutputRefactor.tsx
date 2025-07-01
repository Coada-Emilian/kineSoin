/**
 * @component PhoneNumberOutputRefactor
 *
 * Displays a phone number with its prefix using the BaseOutput component.
 *
 * @param {Object} props
 * @param {string | undefined} props.prefix - The phone number prefix (e.g., country code).
 * @param {string | undefined} props.phone_number - The phone number.
 *
 * @returns {JSX.Element | null} The rendered phone number output or null if no valid number is provided.
 *
 * @example
 * <PhoneNumberOutputRefactor prefix="+33 " phone_number="612345678" />
 */

import BaseOutput from '../../../../generalComponents/BaseOutput';

interface PhoneNumberOutputRefactorProps {
  prefix: string | undefined;
  phone_number: string | undefined;
}

export default function PhoneNumberOutputRefactor({
  prefix,
  phone_number,
}: PhoneNumberOutputRefactorProps) {
  // Combine prefix and phone number
  const full_phone_number =
    prefix && phone_number ? prefix + phone_number : undefined;

  return <BaseOutput value={full_phone_number} label="Téléphone" />;
}
