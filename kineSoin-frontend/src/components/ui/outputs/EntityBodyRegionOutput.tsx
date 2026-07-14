import type { EntityBodyRegionOutputProps } from '../../../@types/props/componentProps';
import { outputDetails } from '../../../utils/config/outputDetails';
import BaseEntityOutputContainer from './BaseEntityOutputContainer';

export default function EntityBodyRegionOutput({
  bodyRegionName,
}: EntityBodyRegionOutputProps) {
  const details = outputDetails.find((detail) => detail.type === 'body_region');
  return (
    <div>
      <BaseEntityOutputContainer
        icon={details?.icon || ''}
        iconAlt={details?.iconAlt || ''}
        label={details?.label || ''}
        value={bodyRegionName || 'Aucune'}
      ></BaseEntityOutputContainer>
    </div>
  );
}
