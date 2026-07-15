import type { EntityAddressOutputProps } from '../../../@types/props/componentProps';
import { outputDetails } from '../../../utils/config/outputDetails';
import BaseEntityOutputContainer from './BaseEntityOutputContainer';

export default function EntityAddressOutput({
  street_number,
  street_name,
  postal_code,
  city,
  isVertical,
}: EntityAddressOutputProps) {
  if (street_number && street_name && postal_code && city) {
    const streetInfo = `${street_number} ${street_name}`;
    const postalCodeAndCity = `${postal_code} ${city}`;
    const details = outputDetails.find((detail) => detail.type === 'address');

    return (
      <BaseEntityOutputContainer
        icon={details?.icon || ''}
        iconAlt={details?.iconAlt || ''}
        label={details?.label || ''}
        value={`${streetInfo}, ${postalCodeAndCity}` as string}
        isVertical={isVertical}
      ></BaseEntityOutputContainer>
    );
  } else {
    return null;
  }
}
