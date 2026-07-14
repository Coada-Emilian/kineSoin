import { useEffect } from 'react';
import type { AfflictionDetailsOutputsProps } from '../../../../../@types/props/therapistProps';
import { outputDetails } from '../../../../../utils/config/outputDetails';
import { hasValues } from '../../../../../utils/functions/admin/adminEntityProfile/hasValues';
import BaseEntityOutputContainer from '../../../outputs/BaseEntityOutputContainer';
import EntityCodeOutput from '../../../outputs/EntityCodeOutput';
import EntityDescriptionOutput from '../../../outputs/EntityDescriptionOutput';
import EntityIdOutput from '../../../outputs/EntityIdOutput';

export default function AfflictionDetailsOutputs({
  selectedAffliction,
}: AfflictionDetailsOutputsProps) {
  useEffect(() => {
    console.log('selectedAffliction:', selectedAffliction);
  }, [selectedAffliction]);

  const regionDetails = outputDetails.find(
    (detail) => detail.type === 'body_region'
  );
  return (
    <>
      {hasValues(selectedAffliction.name) && (
        <EntityIdOutput id={selectedAffliction.id} />
      )}

      {hasValues(selectedAffliction.insurance_code) && (
        <EntityCodeOutput insurance_code={selectedAffliction.insurance_code} />
      )}

      {hasValues(selectedAffliction.body_region.name) && (
        <BaseEntityOutputContainer
          icon={regionDetails?.icon || ''}
          iconAlt={regionDetails?.iconAlt || ''}
          label={regionDetails?.label || ''}
          value={selectedAffliction.body_region.name}
        ></BaseEntityOutputContainer>
      )}

      {hasValues(selectedAffliction.description) && (
        <EntityDescriptionOutput description={selectedAffliction.description} />
      )}
    </>
  );
}
