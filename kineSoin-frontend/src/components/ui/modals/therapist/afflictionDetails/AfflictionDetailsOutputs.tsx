import type { IDashboardAffliction } from '../../../../../@types/interfaces/therapistInterfaces';
import { hasValues } from '../../../../../utils/functions/admin/adminEntityProfile/hasValues';
import EntityBodyRegionOutput from '../../../outputs/EntityBodyRegionOutput';
import EntityCodeOutput from '../../../outputs/EntityCodeOutput';
import EntityDescriptionOutput from '../../../outputs/EntityDescriptionOutput';
import EntityIdOutput from '../../../outputs/EntityIdOutput';

export default function AfflictionDetailsOutputs({
  selectedAffliction,
}: {
  selectedAffliction: IDashboardAffliction;
}) {
  return (
    <>
      {hasValues(selectedAffliction.name) && (
        <EntityIdOutput id={selectedAffliction.id} />
      )}

      {hasValues(selectedAffliction.insurance_code) && (
        <EntityCodeOutput insurance_code={selectedAffliction.insurance_code} />
      )}

      {hasValues(selectedAffliction.body_region?.name) && (
        <EntityBodyRegionOutput
          bodyRegionName={selectedAffliction.body_region?.name}
        />
      )}

      {hasValues(selectedAffliction.description) && (
        <EntityDescriptionOutput description={selectedAffliction.description} />
      )}
    </>
  );
}
