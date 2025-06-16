import BaseOutput from './BaseOutput';

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
