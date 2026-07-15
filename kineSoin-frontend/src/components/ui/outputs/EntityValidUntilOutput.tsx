import type { EntityValidUntilOutputProps } from '../../../@types/props/componentProps';
import { outputDetails } from '../../../utils/config/outputDetails';
import BaseEntityOutputContainer from './BaseEntityOutputContainer';

export default function EntityValidUntilOutput({
  validUntil,
}: EntityValidUntilOutputProps) {
  const details = outputDetails.find((detail) => detail.type === 'validity');
  return (
    <BaseEntityOutputContainer
      icon={details?.icon || ''}
      iconAlt={details?.iconAlt || ''}
      label={details?.label || ''}
      value={validUntil as string}
    ></BaseEntityOutputContainer>
  );
}
