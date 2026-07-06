import type { EntityIdOutputProps } from '../../../@types/props/componentProps';
import { outputDetails } from '../../../utils/config/outputDetails';
import BaseEntityOutputContainer from './BaseEntityOutputContainer';

export default function EntityIdOutput({ id }: EntityIdOutputProps) {
  const details = outputDetails.find((detail) => detail.type === 'id');
  return (
    <div>
      <BaseEntityOutputContainer
        icon={details?.icon || ''}
        iconAlt={details?.iconAlt || ''}
        label={details?.label || ''}
        value={id ? id.toString() : '1'}
      ></BaseEntityOutputContainer>
    </div>
  );
}
