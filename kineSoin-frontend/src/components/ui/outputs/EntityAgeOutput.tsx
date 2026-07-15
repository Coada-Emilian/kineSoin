import type { EntityAgeOutputProps } from '../../../@types/props/componentProps';
import { outputDetails } from '../../../utils/config/outputDetails';
import BaseEntityOutputContainer from './BaseEntityOutputContainer';

export default function EntityAgeOutput({
  age,
  isLabelMissing,
}: EntityAgeOutputProps) {
  const details = outputDetails.find((detail) => detail.type === 'age');

  return (
    <BaseEntityOutputContainer
      icon={details?.icon || ''}
      iconAlt={details?.iconAlt || ''}
      label={isLabelMissing ? '' : details?.label || ''}
      value={age as string}
    ></BaseEntityOutputContainer>
  );
}
