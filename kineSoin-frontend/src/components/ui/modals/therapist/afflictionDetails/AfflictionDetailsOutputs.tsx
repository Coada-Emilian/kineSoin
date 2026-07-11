import { useEffect } from 'react';
import { hasValues } from '../../../../../utils/functions/admin/adminEntityProfile/hasValues';
import EntityCodeOutput from '../../../outputs/EntityCodeOutput';
import EntityDescriptionOutput from '../../../outputs/EntityDescriptionOutput';
import EntityIdOutput from '../../../outputs/EntityIdOutput';

interface AfflictionDetailsOutputsProps {
  selectedAffliction: {
    id: number;
    name: string;
    insurance_code: string;
    description: string;
  };
}

export default function AfflictionDetailsOutputs({
  selectedAffliction,
}: AfflictionDetailsOutputsProps) {
  useEffect(() => {
    console.log('selectedAffliction:', selectedAffliction);
  }, [selectedAffliction]);
  return (
    <>
      {hasValues(selectedAffliction.name) && (
        <EntityIdOutput id={selectedAffliction.id} />
      )}

      {hasValues(selectedAffliction.insurance_code) && (
        <EntityCodeOutput insurance_code={selectedAffliction.insurance_code} />
      )}

      {hasValues(selectedAffliction.description) && (
        <EntityDescriptionOutput description={selectedAffliction.description} />
      )}
    </>
  );
}
