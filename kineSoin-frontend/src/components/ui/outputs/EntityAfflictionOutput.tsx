import type { EntityAfflictionOutputProps } from '../../../@types/props/componentProps';
import { outputDetails } from '../../../utils/config/outputDetails';
import BaseEntityOutputContainer from './BaseEntityOutputContainer';

export default function EntityAfflictionOutput({
  affliction,
}: EntityAfflictionOutputProps) {
  const details = outputDetails.find((detail) => detail.type === 'affliction');
  return (
    <div>
      <BaseEntityOutputContainer
        icon={details?.icon || ''}
        iconAlt={details?.iconAlt || ''}
        label={details?.label || ''}
        value={affliction ? affliction.name.toString() : 'Aucune'}
      ></BaseEntityOutputContainer>
    </div>
  );
}
