import type { EntityDateOutputProps } from '../../../@types/props/componentProps';
import { outputDetails } from '../../../utils/config/outputDetails';
import { formatDate } from '../../../utils/functions/formatDate';
import BaseEntityOutputContainer from './BaseEntityOutputContainer';

export default function EntityDateOutput({ date }: EntityDateOutputProps) {
  const details = outputDetails.find((detail) => detail.type === 'date');
  return (
    <div>
      <BaseEntityOutputContainer
        icon={details?.icon || ''}
        iconAlt={details?.iconAlt || ''}
        label={details?.label || ''}
        value={formatDate(date ? date.toString() : new Date().toString())}
      ></BaseEntityOutputContainer>
    </div>
  );
}
