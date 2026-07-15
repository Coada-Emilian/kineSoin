import type { EntityInsuranceOutputProps } from '../../../@types/props/componentProps';
import { outputDetails } from '../../../utils/config/outputDetails';
import BaseEntityOutputContainer from './BaseEntityOutputContainer';

export default function EntityInsuranceOutput({
  insuranceName,
}: EntityInsuranceOutputProps) {
  const details = outputDetails.find((detail) => detail.type === 'insurance');
  return (
    <BaseEntityOutputContainer
      icon={details?.icon || ''}
      iconAlt={details?.iconAlt || ''}
      label={details?.label || ''}
      value={insuranceName as string}
    ></BaseEntityOutputContainer>
  );
}
