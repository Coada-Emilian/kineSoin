import type { EntityBodyRegionAndOperatedStatusOutputProps } from '../../../@types/props/componentProps';
import { outputDetails } from '../../../utils/config/outputDetails';
import BaseEntityOutputContainer from './BaseEntityOutputContainer';

export default function EntityBodyRegionAndOperatedStatusOutput({
  body_region,
  is_operated,
}: EntityBodyRegionAndOperatedStatusOutputProps) {
  if (!body_region) return null;
  const body_region_name = body_region.name;

  if (is_operated === undefined) {
    return null;
  }

  const regionDetails = outputDetails.find(
    (detail) => detail.type === 'body_region'
  );
  const operatedDetails = outputDetails.find(
    (detail) => detail.type === 'is_operated'
  );

  return (
    <div className="flex justify-between mb-0">
      <BaseEntityOutputContainer
        icon={regionDetails?.icon || ''}
        iconAlt={regionDetails?.iconAlt || ''}
        label={regionDetails?.label || ''}
        value={body_region_name}
      ></BaseEntityOutputContainer>

      <BaseEntityOutputContainer
        icon={operatedDetails?.icon || ''}
        iconAlt={operatedDetails?.iconAlt || ''}
        label={operatedDetails?.label || ''}
        value={body_region_name}
      ></BaseEntityOutputContainer>
    </div>
  );
}
