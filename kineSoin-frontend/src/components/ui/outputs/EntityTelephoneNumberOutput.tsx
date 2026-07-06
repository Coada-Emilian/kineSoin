import type { EntityTelephoneNumberOutputProps } from '../../../@types/props/componentProps';
import { outputDetails } from '../../../utils/config/outputDetails';
import BaseEntityOutputContainer from './BaseEntityOutputContainer';

export default function EntityTelephoneNumberOutput({
  prefix,
  phone_number,
}: EntityTelephoneNumberOutputProps) {
  // Combine prefix and phone number
  const full_phone_number =
    prefix && phone_number ? prefix + phone_number : undefined;

  const details = outputDetails.find((detail) => detail.type === 'telephone');

  return (
    <BaseEntityOutputContainer
      icon={details?.icon || ''}
      iconAlt={details?.iconAlt || ''}
      label={details?.label || ''}
      value={full_phone_number as string}
    ></BaseEntityOutputContainer>
  );
}
