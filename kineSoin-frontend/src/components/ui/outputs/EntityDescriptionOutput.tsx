import type { EntityDescriptionOutputProps } from '../../../@types/props/componentProps';
import { outputDetails } from '../../../utils/config/outputDetails';
import AdminEntityProfileOutput from './BaseEntityProfileOutput';

export default function EntityDescriptionOutput({
  description,
}: EntityDescriptionOutputProps) {
  const details = outputDetails.find((detail) => detail.type === 'description');
  return (
    <div className="flex  gap-2 mb-2">
      <img
        src={details?.icon || ''}
        alt={details?.iconAlt || ''}
        className="h-4 w-4 md:h-6 md:w-6"
      />
      <AdminEntityProfileOutput
        value={description}
        label={details?.label || ''}
        isTextArea
      />
    </div>
  );
}
